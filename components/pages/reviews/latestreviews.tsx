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

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl space-y-8">
        <h2 className="text-xl font-aeonik-bold text-white text-center">
          Latest Mobile Phone Plan Reviews
        </h2>

        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="p-6 rounded-lg shadow-lg"
            style={{ background: "rgba(55,10,81,.19)" }}
            ref={index === reviews.length - 1 && loadMode === 'auto' ? lastReviewRef : null}
          >
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
              <p className="text-sm font-aeonik-bold text-white">
                {review.name} {" "}
                <span className="font-aeonik-regular text-gray-300">(City: {review.city})</span>
              </p>
            </div>
            <blockquote className="mt-4 text-sm font-aeonik-regular text-gray-300 italic border-l-4 pl-4 border-[#F6642D]">
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
            <div className="mt-6 space-y-2">
              <p className="text-sm font-aeonik-regular text-gray-300">
                <span className="font-aeonik-bold text-white">Service:</span>{" "}
                {review.serviceRating.toFixed(1)}/5
              </p>
              <p className="text-sm font-aeonik-regular text-gray-300">
                <span className="font-aeonik-bold text-white">Pricing:</span>{" "}
                {review.pricingRating.toFixed(1)}/5
              </p>
              <p className="text-sm font-aeonik-regular text-gray-300">
                <span className="font-aeonik-bold text-white">Speed:</span>{" "}
                {review.speedRating.toFixed(1)}/5
              </p>
            </div>
          </div>
        ))}

        {loading && <p className="text-center text-white">Loading more reviews...</p>}

        {loadMode === 'manual' && hasMore && !loading && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 text-white bg-[#F6642D] rounded hover:bg-[#d65529]"
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
