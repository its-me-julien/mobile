const admin = require("firebase-admin");
const { z } = require("zod");

// Initialize Firebase Admin SDK
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;

if (!admin.apps.length) {
  if (!serviceAccount) {
    console.error("FIREBASE_SERVICE_ACCOUNT environment variable is missing or invalid.");
    process.exit(1);
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Zod schema to validate incoming collection name
const collectionSchema = z.string().regex(/^[a-zA-Z0-9_-]+$/, "Invalid collection name.");

// Zod schema for review object validation
const reviewSchema = z.object({
  overallRating: z.number().min(1).max(5),
  serviceRating: z.number().min(1).max(5),
  pricingRating: z.number().min(1).max(5),
  speedRating: z.number().min(1).max(5),
});

exports.handler = async (event) => {
  try {
    // Parse and validate input
    const { collection } = JSON.parse(event.body);
    collectionSchema.parse(collection);  // This will throw if invalid
    
    // Fetch all reviews
    const snapshot = await db.collection(collection).get();

    if (snapshot.empty) {
      // Return a consistent empty response
      return {
        statusCode: 200,
        body: JSON.stringify({
          totalReviews: 0,
          averageOverallRating: 0,
          ratingsBreakdown: {
            overall: 0,
            service: 0,
            pricing: 0,
            speed: 0,
          },
        }),
      };
    }

    // Initialize accumulators
    let totalReviews = 0;
    let sumOverallRating = 0;
    let sumServiceRating = 0;
    let sumPricingRating = 0;
    let sumSpeedRating = 0;

    // Aggregate data
    snapshot.forEach((doc) => {
      const review = doc.data();

      try {
        // Validate review data using Zod
        reviewSchema.parse(review);

        totalReviews++;
        sumOverallRating += review.overallRating;
        sumServiceRating += review.serviceRating;
        sumPricingRating += review.pricingRating;
        sumSpeedRating += review.speedRating;
      } catch (validationError) {
        console.warn("Skipping invalid review:", validationError.errors);
      }
    });

    if (totalReviews === 0) {
      // Safeguard in case all reviews are invalid
      return {
        statusCode: 200,
        body: JSON.stringify({
          totalReviews: 0,
          averageOverallRating: 0,
          ratingsBreakdown: {
            overall: 0,
            service: 0,
            pricing: 0,
            speed: 0,
          },
        }),
      };
    }

    // Calculate averages
    const averageOverallRating = sumOverallRating / totalReviews;
    const averageService = sumServiceRating / totalReviews;
    const averagePricing = sumPricingRating / totalReviews;
    const averageSpeed = sumSpeedRating / totalReviews;

    // Return aggregated data
    return {
      statusCode: 200,
      body: JSON.stringify({
        totalReviews,
        averageOverallRating,
        ratingsBreakdown: {
          overall: averageOverallRating,
          service: averageService,
          pricing: averagePricing,
          speed: averageSpeed,
        },
      }),
    };
  } catch (error) {
    console.error("Error fetching review summary:", {
      message: error.message,
      stack: error.stack,
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
