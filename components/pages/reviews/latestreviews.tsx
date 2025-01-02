"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

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
  recommends: "Yes" | "No";
}

interface GetReviewsResponse {
  reviews: Review[];
  total: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedReviewIds, setExpandedReviewIds] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadMode, setLoadMode] = useState<'auto' | 'manual'>('auto');

  const reviewsPerBatch = 10; // Initial auto-load limit
  const manualLoadBatch = 20; // Batch size for manual load
  const observer = useRef<IntersectionObserver | null>(null); // Persist the observer instance

  const fetchReviews = useCallback(
    async (offset: number, limit: number) => {
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

        if (!Array.isArray(data.reviews)) {
          throw new Error("Invalid API response: reviews should be an array");
        }

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
          recommends: review.recommends ?? false, // Default to false if not provided
        }));

        setReviews((prev) => [...prev, ...sanitizedReviews]);
        setHasMore(sanitizedReviews.length === limit);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

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

  const lastReviewRef = (node: HTMLDivElement) => {
    if (loading || loadMode === 'manual') return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setLoadMode('manual'); // Switch to manual mode after auto-loading 10
      }
    });

    if (node) observer.current.observe(node);
  };

  const handleLoadMore = () => {
    fetchReviews(reviews.length, manualLoadBatch);
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
        <h2 className="text-2xl font-aeonik-bold text-gray-800 text-center leading-relaxed tracking-wide">
          Latest World Mobile Phone Plan Reviews
        </h2>

        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            ref={index === reviews.length - 1 && loadMode === 'auto' ? lastReviewRef : null}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-start space-y-2">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name={`rating-${review.id}`}
                      className={`mask mask-star-2 ${
                        i < review.overallRating ? "bg-[#F6642D]" : "bg-gray-500"
                      }`}
                      checked={i === Math.floor(review.overallRating) - 1}
                      readOnly
                    />
                  ))}
                </div>
                <p className="text-sm font-aeonik-bold text-gray-800">
                  {review.name} {" "}
                  <span className="font-aeonik-regular text-gray-600">(City: {review.city})</span>
                </p>
              </div>
              <p className="text-sm font-aeonik-regular text-gray-600">{formatDate(review.createdAt)}</p>
            </div>
            <blockquote
              className="mt-4 text-sm font-aeonik-regular text-gray-600 overflow-hidden max-h-20 transition-all duration-300 ease-in-out"
              style={{
                maxHeight: expandedReviewIds.includes(review.id) ? "100%" : "5rem",
              }}
            >
              {expandedReviewIds.includes(review.id) ? (
                review.feedback
              ) : review.feedback.length > 200 ? (
                <>
                  {review.feedback.slice(0, 200)}...
                  <button
                    onClick={() => toggleExpandReview(review.id)}
                    className="text-[#F6642D] underline ml-1"
                  >
                    Read more
                  </button>
                </>
              ) : (
                review.feedback
              )}
            </blockquote>
            <div className="mt-6 flex space-x-4 text-sm font-aeonik-bold">
              <span className={`badge ${getBadgeClass(review.serviceRating)}`}>
                Service: {Math.round(review.serviceRating)}/5
              </span>
              <span className={`badge ${getBadgeClass(review.pricingRating)}`}>
                Pricing: {Math.round(review.pricingRating)}/5
              </span>
              <span className={`badge ${getBadgeClass(review.speedRating)}`}>
                Speed: {Math.round(review.speedRating)}/5
              </span>
            </div>
            <p className="mt-4 text-sm font-aeonik-regular text-gray-800">
            {review.recommends === "Yes"
              ? `${review.name} would recommend this service.`
              : `${review.name} does not recommend this service.`}
          </p>
          </div>
        ))}

        {loading && <p className="text-center text-gray-800">Loading more reviews...</p>}

        {loadMode === 'manual' && hasMore && !loading && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 text-white bg-[#D42E58] rounded hover:bg-[#C42A4E] transition-colors duration-300"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;