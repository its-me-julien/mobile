"use client";

import React from "react";

const JoinDiscussion: React.FC = () => {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Join the World Mobile Community",
    description:
      "Join the World Mobile Club community to discuss mobile phone plans, share reviews, connect with other customers, and stay informed about the latest developments.",
    mainEntity: [
      {
        "@type": "DiscussionForumPosting",
        name: "Mobile Plan Reviews",
        headline: "Share and read genuine reviews of World Mobile phone plans",
        url: "https://worldmobile.club/c/world-mobile-customers/world-mobile-customer-reviews/68",
        description:
          "Explore authentic reviews about World Mobile phone plans. Learn from customer experiences to make informed decisions.",
        author: {
          "@type": "Person",
          name: "World Mobile Club",
        },
        datePublished: "2025-01-01",
      },
      {
        "@type": "DiscussionForumPosting",
        name: "Visit the Club",
        headline: "Connect and collaborate within the World Mobile ecosystem",
        url: "https://worldmobile.club/c/world-mobile-club/23",
        description:
          "Stay updated on the latest news, celebrate milestones, and collaborate with the World Mobile community.",
        author: {
          "@type": "Person",
          name: "World Mobile Club",
        },
        datePublished: "2025-01-01",
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="mt-16 max-w-7xl mx-auto px-6 space-y-16">
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto space-y-6">
  <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
    Ask the{" "}
    <span className="bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] bg-clip-text text-transparent">
      World Mobile Community
    </span>
  </h2>
  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
    Join the World Mobile Club to share your experience,
    connect with others, and stay informed about the latest home
    internet offerings and updates.
  </p>
</header>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Card 1: Mobile Plan Reviews */}
          <article className="bg-white rounded-lg shadow-lg border border-gray-200 transition-transform hover:scale-105">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-black">
                Mobile Plan Reviews
              </h3>
              <p className="text-gray-600 mt-4">
                Explore genuine reviews and experiences from customers about
                World Mobile phone plans.
              </p>
              <div className="mt-6">
                <a
                  href="https://worldmobile.club/c/world-mobile-customers/world-mobile-customer-reviews/68"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white font-medium px-6 py-3 rounded-full hover:brightness-110 focus:ring-2 focus:ring-offset-2 focus:ring-[#5A2FBA]"
                >
                  Read Reviews
                </a>
              </div>
            </div>
          </article>

          {/* Card 2: Visit the Club */}
          <article className="bg-white rounded-lg shadow-lg border border-gray-200 transition-transform hover:scale-105">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-black">
                Visit the Club
              </h3>
              <p className="text-gray-600 mt-4">
                Join discussions about World Mobile, phone plans, mobile coverage and connect with the community.
              </p>
              <div className="mt-6">
                <a
                  href="https://worldmobile.club/c/world-mobile-club/23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white font-medium px-6 py-3 rounded-full hover:brightness-110 focus:ring-2 focus:ring-offset-2 focus:ring-[#5A2FBA]"
                >
                  Join the Club
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default JoinDiscussion;
