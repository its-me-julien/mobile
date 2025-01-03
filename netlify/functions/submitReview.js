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
  email: z.string().email().or(z.literal("")),
  reviewType: z.enum(["broadband", "mobileplan"]),
  captchaToken: z.string(),
});

const getIpAddress = (event) => {
  return event.headers['x-forwarded-for']?.split(',')[0].trim() || event.requestContext?.identity?.sourceIp || "Unknown";
};

const isThrottled = async (ip) => {
  try {
    const ipDocRef = db.collection("ip_logs").doc(ip);
    const ipDoc = await ipDocRef.get();

    if (ipDoc.exists) {
      const { submissionCount = 0, lastSubmission } = ipDoc.data();
      const now = Date.now();

      // Check if last submission was within the same day
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      if (lastSubmission && lastSubmission.toMillis() > startOfToday.getTime()) {
        if (submissionCount >= 5) {
          console.log(`IP ${ip} throttled. Submission count: ${submissionCount}`);
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking throttling:", error);
    return false; // Allow submissions if throttling check fails
  }
};

const logSubmission = async (ip) => {
  try {
    const ipDocRef = db.collection("ip_logs").doc(ip);
    const ipDoc = await ipDocRef.get();
    const now = admin.firestore.Timestamp.now();

    if (ipDoc.exists) {
      const { submissionCount = 0, lastSubmission } = ipDoc.data();
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      if (lastSubmission && lastSubmission.toMillis() > startOfToday.getTime()) {
        // Increment submission count
        await ipDocRef.update({
          submissionCount: admin.firestore.FieldValue.increment(1),
          lastSubmission: now,
        });
      } else {
        // Reset count for a new day
        await ipDocRef.set({
          submissionCount: 1,
          lastSubmission: now,
        });
      }
    } else {
      // New IP, start logging
      await ipDocRef.set({
        submissionCount: 1,
        lastSubmission: now,
      });
    }

    console.log(`Logged submission for IP: ${ip}`);
  } catch (error) {
    console.error("Error logging submission:", error);
    throw new Error("Submission logging failed"); // Prevent submission if logging fails
  }
};

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    // Validate input data using Zod
    const parseResult = ReviewSchema.safeParse(data);
    if (!parseResult.success) {
      console.error("Validation failed:", parseResult.error.issues);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: parseResult.error.issues }),
      };
    }

    const validatedData = parseResult.data;

    // Capture IP address
    const ip = getIpAddress(event);

    // Check throttling
    if (await isThrottled(ip)) {
      return {
        statusCode: 429, // Too Many Requests
        body: JSON.stringify({
          error: "Rate limit exceeded. Please try again tomorrow.",
          message: "You have reached the daily limit of 5 submissions from this IP address.",
        }),
      };
    }

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
      email: validatedData.email || "anonymous@example.com",
      createdAt: new Date().toISOString(),
    };
    delete sanitizedData.captchaToken; // Remove CAPTCHA token before saving

    // Save review to Firestore
    const docRef = await db.collection(collectionName).add(sanitizedData);
    console.log(`Review saved with ID: ${docRef.id}`);

    // Log IP address for throttling
    await logSubmission(ip);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Review saved successfully",
        id: docRef.id,
      }),
    };
  } catch (error) {
    console.error("Error processing submission:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
