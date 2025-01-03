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

// Function to get grade text based on average rating
const getGradeText = (averageRating: number) => {
  if (averageRating >= 4.5) return "Excellent";
  if (averageRating >= 3.5) return "Very Good";
  if (averageRating >= 2.5) return "OK";
  if (averageRating >= 1.5) return "Poor";
  return "Poor";
};

const ReviewSummary: React.FC<ReviewSummaryProps> = React.memo(
  ({
    totalReviews = 0,
    averageRating = 0,
    ratingsBreakdown = { overall: 0, service: 0, pricing: 0, speed: 0 },
  }) => {
    // Clamp average rating between 0 and 5
    const clampedAverageRating = Math.min(Math.max(averageRating, 0), 5);
    const gradeText = getGradeText(clampedAverageRating);

    // Metrics to display
    const metrics = [
      { name: "Overall", value: ratingsBreakdown.overall },
      { name: "Service", value: ratingsBreakdown.service },
      { name: "Pricing", value: ratingsBreakdown.pricing },
      { name: "Speed", value: ratingsBreakdown.speed },
    ];

    return (
      <div className="flex justify-center py-10">
        <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              {totalReviews} Reviews - {gradeText}
            </h2>
            <div className="flex justify-center items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 ${
                    index < Math.round(clampedAverageRating)
                      ? "bg-[#F6642D]"
                      : "bg-gray-300"
                  } mask mask-star-2`}
                ></div>
              ))}
              <span className="ml-2 text-base font-medium text-gray-700">
                {clampedAverageRating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Ratings Breakdown */}
          <div className="space-y-5">
            {metrics.map(({ name, value }) => (
              <div key={name}>
                <p className="text-sm font-medium text-gray-700 capitalize">{name}</p>
                <div className="flex items-center space-x-3">
                  <div
                    className="flex-1 h-2 rounded bg-gray-200 overflow-hidden"
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
                  <span className="text-sm font-semibold text-gray-800">
                    {value.toFixed(1)}/5
                  </span>
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
