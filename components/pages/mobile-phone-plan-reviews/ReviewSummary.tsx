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
  const safeRatingsBreakdown = {
    overall: ratingsBreakdown?.overall ?? 0,
    service: ratingsBreakdown?.service ?? 0,
    pricing: ratingsBreakdown?.pricing ?? 0,
    speed: ratingsBreakdown?.speed ?? 0,
  };

  const clampedAverageRating = Math.min(Math.max(averageRating, 0), 5);
  const ratingValue = clampedAverageRating.toFixed(1);
  const bestRating = 5;
  const worstRating = 0;

  return totalReviews > 0
    ? {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "itemReviewed": {
          "@type": "Service",
          "name": "World Mobile Phone Plans",
        },
        "ratingValue": ratingValue,
        "reviewCount": totalReviews,
        "bestRating": bestRating,
        "worstRating": worstRating,
        "ratingBreakdown": [
          { "name": "Overall", "rating": safeRatingsBreakdown.overall.toFixed(1) },
          { "name": "Service", "rating": safeRatingsBreakdown.service.toFixed(1) },
          { "name": "Pricing", "rating": safeRatingsBreakdown.pricing.toFixed(1) },
          { "name": "Speed", "rating": safeRatingsBreakdown.speed.toFixed(1) },
        ],
      }
    : null;
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

    // Metrics
    const metrics = [
      { name: "Overall", value: safeRatingsBreakdown.overall },
      { name: "Service", value: safeRatingsBreakdown.service },
      { name: "Pricing", value: safeRatingsBreakdown.pricing },
      { name: "Speed", value: safeRatingsBreakdown.speed },
    ];

    return (
      <div className="flex justify-center py-10">
        <div className="w-full max-w-lg p-6 rounded-lg shadow-lg">
          {/* Output Structured Data */}
          {structuredData && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
          )}

          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-xl font-aeonik-bold text-white text-center">
              {totalReviews} Reviews - Excellent
            </h2>
            <p className="text-sm font-aeonik-regular text-gray-300 text-center mt-2">
              {"★".repeat(Math.round(clampedAverageRating))} - {clampedAverageRating.toFixed(1)}
            </p>
          </div>

          {/* Metrics */}
          <div className="space-y-6">
            {metrics.map(({ name, value }) => (
              <div key={name}>
                <p className="text-sm font-aeonik-regular text-gray-300 capitalize">{name}</p>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-full h-2 rounded bg-gray-800 overflow-hidden"
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
                  <span className="text-sm font-aeonik-bold text-white">{value.toFixed(1)}/5</span>
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
