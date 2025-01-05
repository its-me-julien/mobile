"use client";

import React, { useEffect, useState } from "react";
import Menu from "../../components/header/Menu";  // Import the Menu component
import Header from "../../components/header/Header"; // Corrected import for the header
import Footer from "../../components/footer/Footer";
import JoinDiscussion from "../../components/pages/reviews/discussions";
import MetaFields from "../../components/pages/reviews/metafields";
import ReviewSummary from "../../components/pages/reviews/ReviewSummary";
import PostReview from "../../components/pages/reviews/post-review";
import Latestreviews from "../../components/pages/reviews/latestreviews";

const MobilePlanReviewsPage = () => {
  const [summaryData, setSummaryData] = useState({
    totalReviews: 1,
    averageRating: 5,
    ratingsBreakdown: {
      overall: 5,
      service: 5,
      pricing: 5,
      speed: 5,
    },
  });
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoadingSummary(true);
      try {
        const response = await fetch("/.netlify/functions/getReviewSummary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collection: "mobileplan_review" }),
        });

        const data = await response.json();
        if (response.ok) {
          setSummaryData({
            totalReviews: data.totalReviews ?? 0,
            averageRating: data.averageOverallRating ?? 0,
            ratingsBreakdown: {
              overall: data.ratingsBreakdown?.overall ?? 0,
              service: data.ratingsBreakdown?.service ?? 0,
              pricing: data.ratingsBreakdown?.pricing ?? 0,
              speed: data.ratingsBreakdown?.speed ?? 0,
            },
          });
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching review summary:", error);
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-100 to-white text-black">
      {/* Menu Component */}
      <Menu />

      {/* Updated Header */}
      <Header 
        title="Real Reviews from World Mobile Phone Plans Customers" 
        gradientWords={["World Mobile Phone Plans"]} 
        showArrow={false} 
        subtitle="Considering a World Mobile phone plan? Read real customer reviews to understand the value, speed, and reliability of these plans before you make a decision."
      />

      {/* Meta Fields */}
      <MetaFields />

      {/* Main Content */}
      <main className="flex-grow w-full py-8 px-4">
        <div className="container mx-auto space-y-10">


          {/* Review Summary */}
          <section id="review-summary" aria-labelledby="review-summary-title" className="space-y-6">
            <h2
              id="review-summary-title"
              className="sr-only text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-800"
            >
              How do customers rate World Mobile Mobile Phone Plans?
            </h2>
            {loadingSummary ? (
              <p className="text-center text-gray-700">Loading summary...</p>
            ) : (
              <ReviewSummary
                totalReviews={summaryData.totalReviews}
                averageRating={summaryData.averageRating}
                ratingsBreakdown={summaryData.ratingsBreakdown}
              />
            )}
          </section>

          {/* Latest Reviews */}
          <section id="latest-reviews" aria-labelledby="latest-reviews-title" className="space-y-6">
            <h2
              id="latest-reviews-title"
              className="sr-only text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-800"
            >
              Latest Customer Reviews
            </h2>
            <Latestreviews />
          </section>

          {/* Post New Review */}
          <section id="post-review" aria-labelledby="post-review-title" className="space-y-6">
            <h2
              id="post-review-title"
              className="sr-only text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-800"
            >
              Post a New Review
            </h2>
            <PostReview />
          </section>

          {/* Join Discussion Section */}
          <section
            id="join-discussion"
            aria-labelledby="join-discussion-title"
            className="space-y-6"
          >
            <h2
              id="join-discussion-title"
              className="sr-only text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-800"
            >
              Join the Community
            </h2>
            <JoinDiscussion />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MobilePlanReviewsPage;
