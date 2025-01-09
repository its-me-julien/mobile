import React, { useEffect, useState, useCallback } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface Review {
  id: string;
  overallRating: number;
  serviceRating: number;
  pricingRating: number;
  speedRating: number;
  feedback: string;
  name: string;
  city: string;
  createdAt: string;
  recommend: "Yes" | "No";
}

interface GetReviewsResponse {
  reviews: Review[];
  total: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedReviewIds, setExpandedReviewIds] = useState<string[]>([]);
  const [aggregatedData, setAggregatedData] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingsBreakdown: { overall: 0, service: 0, pricing: 0, speed: 0 },
  });

  const reviewsPerBatch = 5;

  const fetchReviews = useCallback(async (offset: number, limit: number) => {
    setLoading(true);
    try {
      const response = await fetch("/.netlify/functions/getReviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: "mobileplan_review",
          limit,
          offset,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data: GetReviewsResponse = await response.json();

      const sanitizedReviews = data.reviews.map((review) => ({
        id: review.id || "",
        overallRating: review.overallRating || 0,
        serviceRating: review.serviceRating || 0,
        pricingRating: review.pricingRating || 0,
        speedRating: review.speedRating || 0,
        feedback: review.feedback || "",
        name: review.name || "Anonymous",
        city: review.city || "Unknown",
        createdAt: review.createdAt || "",
        recommend: review.recommend as "Yes" | "No",
      }));

      setReviews((prev) => [...prev, ...sanitizedReviews]);

      // Calculate aggregations
      const totalReviews = sanitizedReviews.length;
      const ratingsBreakdown = sanitizedReviews.reduce(
        (acc, review) => {
          acc.overall += review.overallRating;
          acc.service += review.serviceRating;
          acc.pricing += review.pricingRating;
          acc.speed += review.speedRating;
          return acc;
        },
        { overall: 0, service: 0, pricing: 0, speed: 0 }
      );

      const averageRating = ratingsBreakdown.overall / totalReviews;

      setAggregatedData({
        totalReviews,
        averageRating,
        ratingsBreakdown: {
          overall: ratingsBreakdown.overall / totalReviews,
          service: ratingsBreakdown.service / totalReviews,
          pricing: ratingsBreakdown.pricing / totalReviews,
          speed: ratingsBreakdown.speed / totalReviews,
        },
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews(0, reviewsPerBatch);
  }, [fetchReviews]);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getRecommendationMessage = (recommends: string, name: string) => {
    if (recommends === "Yes") {
      return (
        <>
          <FaThumbsUp className="inline-block text-green-500 mr-1" />
          {`${name} would recommend this service.`}
        </>
      );
    }
    return (
      <>
        <FaThumbsDown className="inline-block text-red-500 mr-1" />
        {`${name} does not recommend this service.`}
      </>
    );
  };

  const toggleExpandReview = (id: string) => {
    setExpandedReviewIds((prev) =>
      prev.includes(id) ? prev.filter((reviewId) => reviewId !== id) : [...prev, id]
    );
  };

  const getBadgeClass = (rating: number) => {
    if (rating >= 4) return "bg-[#F6642D] text-white";
    if (rating >= 2) return "bg-[#5A2FBA] text-white";
    return "bg-[#D42E58] text-white";
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center leading-snug tracking-tight">
      Latest World Mobile Phone Plan Reviews
    </h2>

       {/* JSON-LD Script */}
       <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "World Mobile Phone Plan",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregatedData.averageRating.toFixed(1),
      "reviewCount": aggregatedData.totalReviews,
      "bestRating": "5",
      "worstRating": "1",
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Service",
        "value": aggregatedData.ratingsBreakdown.service.toFixed(1),
      },
      {
        "@type": "PropertyValue",
        "name": "Pricing",
        "value": aggregatedData.ratingsBreakdown.pricing.toFixed(1),
      },
      {
        "@type": "PropertyValue",
        "name": "Speed",
        "value": aggregatedData.ratingsBreakdown.speed.toFixed(1),
      },
    ],
    "review": reviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name || "Anonymous",
      },
      "datePublished": review.createdAt || new Date().toISOString(),
      "reviewBody": review.feedback || "No feedback provided.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.overallRating.toFixed(1),
        "bestRating": "5",
        "worstRating": "1",
      },
    })),
  })}
</script>


        {reviews.map((review) => (
          <div
          key={review.id}
          className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Header: Reviewer Info */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-start space-y-2">
              {/* Star Rating */}
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 mask mask-star-2 ${
                      i < review.overallRating ? "bg-[#F6642D]" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
              {/* Reviewer Name and Location */}
              <p className="text-base font-semibold text-gray-800">
                {review.name}{" "}
                <span className="text-sm font-medium text-gray-600">
                  (Location: {review.city})
                </span>
              </p>
            </div>
            {/* Review Date */}
            <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        
          {/* Feedback */}
          <div className="mt-4">
  <blockquote
    className="text-sm text-gray-700 overflow-hidden transition-all duration-300 ease-in-out leading-relaxed"
    style={{
      maxHeight: expandedReviewIds.includes(review.id) ? "100%" : "5rem",
    }}
  >
    {expandedReviewIds.includes(review.id)
      ? review.feedback
      : `${review.feedback.slice(0, 200)}...`}
  </blockquote>
  {review.feedback.length > 200 && (
    <div className="mt-2 flex justify-end">
      <button
        onClick={() => toggleExpandReview(review.id)}
        className="text-[#F6642D] underline font-medium text-xs sm:text-sm hover:text-[#e55c2c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F6642D] transition duration-200"
      >
        {expandedReviewIds.includes(review.id) ? "Read less" : "Read more"}
      </button>
    </div>
  )}
</div>

        
          {/* Ratings Breakdown */}
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
  {[
    { label: "Service", value: review.serviceRating },
    { label: "Pricing", value: review.pricingRating },
    { label: "Speed", value: review.speedRating },
  ].map(({ label, value }) => (
    <span
      key={label}
      className={`badge px-3 py-1 font-medium rounded-full ${
        getBadgeClass(value)
      } max-w-[120px] text-xs md:text-sm`} // Added responsive classes
    >
      {label}: {value}/5
    </span>
  ))}
</div>
        
          {/* Recommendation */}
          <p className="mt-4 text-sm text-gray-800 font-medium">
            {getRecommendationMessage(review.recommend, review.name)}
          </p>
        </div>
        
        ))}

{reviews.length < aggregatedData.totalReviews && (
  <div className="text-center mt-6">
    <button
      onClick={() => fetchReviews(reviews.length, reviewsPerBatch)}
      className="px-6 py-3 bg-[#000000e6] text-white font-bold rounded-lg hover:bg-[#e55c2c] transition-colors duration-300"
      disabled={loading}
    >
      {loading ? "Loading..." : "Show More Reviews"}
    </button>
  </div>
)}

{loading && (
        <p className="text-center text-lg font-medium text-gray-700 animate-pulse">
          Loading more reviews...
        </p>
      )}
      </div>
    </div>
  );
};

export default Reviews;