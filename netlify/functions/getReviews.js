const admin = require('firebase-admin');
const { z } = require('zod');

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Define Zod schema for input validation
const querySchema = z.object({
  collection: z.string().regex(/^[a-zA-Z0-9_-]+$/, 'Invalid collection name'), // Validates collection name
  limit: z.number().min(1).max(100, 'Limit must be between 1 and 100'), // Validates limit
  offset: z.number().min(0, 'Offset must be zero or greater'), // Validates offset
});

exports.handler = async (event) => {
  try {
    // Parse and validate input parameters using Zod
    const { collection, limit, offset } = querySchema.parse(JSON.parse(event.body));

    // Query Firestore with pagination
    const snapshot = await db
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .offset(offset) // Firestore handles offsets here
      .limit(limit)
      .get();

    // Map the reviews from the snapshot
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch total count using Firestore count() aggregation
    const total = (await db.collection(collection).count().get()).data().count;

    return {
      statusCode: 200,
      body: JSON.stringify({ reviews, total }),
    };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.errors[0].message }), // Return Zod validation error message
      };
    }

    // Handle other errors
    console.error('Error fetching reviews:', {
      body: event.body,
      error: error.message,
      stack: error.stack,
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
