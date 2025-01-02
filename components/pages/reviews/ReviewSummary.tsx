"use client";

import React from "react";

// Enhanced RatingsBreakdown interface
interface RatingsBreakdown {
  overall: number;
  service: number;
  pricing: number;
  speed: number;
}

// ReviewSummaryProps interface with enhanced types
interface ReviewSummaryProps {
  totalReviews?: number;
  averageRating?: number;
  ratingsBreakdown?: RatingsBreakdown;
}

// Function to generate structured data for SEO
const generateStructuredData = (
  totalReviews: number,
  averageRating: number,
  ratingsBreakdown: RatingsBreakdown
) => {
  if (totalReviews <= 0) return null; // Skip if no reviews

  const safeRatingsBreakdown = {
    overall: ratingsBreakdown?.overall ?? 0,
    service: ratingsBreakdown?.service ?? 0,
    pricing: ratingsBreakdown?.pricing ?? 0,
    speed: ratingsBreakdown?.speed ?? 0,
  };

  const clampedAverageRating = Math.min(Math.max(averageRating, 0), 5).toFixed(1);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "World Mobile Phone Plans",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": clampedAverageRating,
      "reviewCount": totalReviews,
      "bestRating": "5",
      "worstRating": "1",
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Service",
        "value": safeRatingsBreakdown.service.toFixed(1),
      },
      {
        "@type": "PropertyValue",
        "name": "Pricing",
        "value": safeRatingsBreakdown.pricing.toFixed(1),
      },
      {
        "@type": "PropertyValue",
        "name": "Speed",
        "value": safeRatingsBreakdown.speed.toFixed(1),
      },
    ],
  };
};

// Function to get grade text based on average rating
const getGradeText = (averageRating: number) => {
  if (averageRating >= 4.5) return "Excellent";
  if (averageRating >= 3.5) return "Very Good";
  if (averageRating >= 2.5) return "OK";
  if (averageRating >= 1.5) return "Poor";
  return "Poor";
};

const ReviewSummary: React.FC<ReviewSummaryProps> = React.memo(
  ({ totalReviews = 0, averageRating = 0, ratingsBreakdown = { overall: 0, service: 0, pricing: 0, speed: 0 } }) => {
    // Generate SEO structured data
    const structuredData = generateStructuredData(totalReviews, averageRating, ratingsBreakdown);

    // Safe ratings breakdown
    const safeRatingsBreakdown = {
      overall: ratingsBreakdown?.overall ?? 0,
      service: ratingsBreakdown?.service ?? 0,
      pricing: ratingsBreakdown?.pricing ?? 0,
      speed: ratingsBreakdown?.speed ?? 0,
    };

    const clampedAverageRating = Math.min(Math.max(averageRating, 0), 5);
    const gradeText = getGradeText(clampedAverageRating);

    // Metrics
    const metrics = [
      { name: "Overall", value: safeRatingsBreakdown.overall },
      { name: "Service", value: safeRatingsBreakdown.service },
      { name: "Pricing", value: safeRatingsBreakdown.pricing },
      { name: "Speed", value: safeRatingsBreakdown.speed },
    ];

    return (
      <div className="flex justify-center py-10">
        <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white">
          {/* Output Structured Data */}
          {structuredData && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
          )}

          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-xl font-aeonik-bold text-black text-center">
              {totalReviews} Reviews - {gradeText}
            </h2>
            <p className="text-sm font-aeonik-regular text-gray-600 text-center mt-2">
              {"★".repeat(Math.round(clampedAverageRating))} - {clampedAverageRating.toFixed(1)}
            </p>
          </div>

          {/* Metrics */}
          <div className="space-y-6">
            {metrics.map(({ name, value }) => (
              <div key={name}>
                <p className="text-sm font-aeonik-regular text-gray-600 capitalize">{name}</p>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-full h-2 rounded bg-gray-200 overflow-hidden"
                    aria-label={`${name} rating: ${value.toFixed(1)}`}
                  >
                    <div
                      className="h-2"
                      style={{
                        background: "linear-gradient(to right, #F6642D, #D42E58, #5A2FBA)",
                        width: `${(value / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-aeonik-bold text-black">{value.toFixed(1)}/5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

// Assign displayName to the component for debugging and linting
ReviewSummary.displayName = "ReviewSummary";

export default ReviewSummary;
