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

exports.handler = async (event) => {
  try {
    // Parse and validate input
    const { collection } = JSON.parse(event.body);
    collectionSchema.parse(collection);  // This will throw if invalid

    // Use Firestore Aggregation Query
    const aggregationQuery = db.collection(collection).select(
      "overallRating",
      "serviceRating",
      "pricingRating",
      "speedRating"
    );

    const snapshot = await aggregationQuery.get();

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
    for (const doc of snapshot.docs) {
      const review = doc.data();
      if (!review) continue; // Safeguard against undefined data

      totalReviews++;
      sumOverallRating += review.overallRating || 0;
      sumServiceRating += review.serviceRating || 0;
      sumPricingRating += review.pricingRating || 0;
      sumSpeedRating += review.speedRating || 0;
    }

    // Calculate averages
    const calculateAverage = (sum, count) => (count ? sum / count : 0);
    const averageOverallRating = calculateAverage(sumOverallRating, totalReviews);
    const averageService = calculateAverage(sumServiceRating, totalReviews);
    const averagePricing = calculateAverage(sumPricingRating, totalReviews);
    const averageSpeed = calculateAverage(sumSpeedRating, totalReviews);

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
