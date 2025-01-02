const fetch = require("node-fetch");
const admin = require("firebase-admin");
const { z } = require("zod");

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://worldmobilereviews.firebaseio.com",
  });
}

const db = admin.firestore();

// Zod schema for validating input data
const ReviewSchema = z.object({
  overallRating: z.number().min(1).max(5),
  serviceRating: z.number().min(1).max(5),
  pricingRating: z.number().min(1).max(5),
  speedRating: z.number().min(1).max(5),
  feedback: z.string().max(3500),
  recommend: z.enum(["Yes", "No"]),
  name: z.string().max(50),
  city: z.string().max(60),
  zipcode: z.string().max(20),
  email: z.string().email().optional(),
  reviewType: z.enum(["broadband", "mobileplan"]),
  captchaToken: z.string(),
});

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    // Validate input data using Zod
    const parseResult = ReviewSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: parseResult.error.issues }),
      };
    }

    const validatedData = parseResult.data;

    // Validate reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${validatedData.captchaToken}`;

    const captchaVerifyResponse = await fetch(verificationUrl, { method: "POST" });
    const captchaVerifyData = await captchaVerifyResponse.json();

    if (!captchaVerifyData.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "CAPTCHA validation failed" }),
      };
    }

    // Determine collection based on reviewType
    const collectionName =
      validatedData.reviewType === "broadband"
        ? "broadband_review"
        : "mobileplan_review";

    // Prepare data for saving
    const sanitizedData = {
      ...validatedData,
      createdAt: new Date().toISOString(),
    };
    delete sanitizedData.captchaToken; // Remove CAPTCHA token before saving

    // Save review to Firestore
    const docRef = await db.collection(collectionName).add(sanitizedData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Review saved successfully",
        id: docRef.id,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
