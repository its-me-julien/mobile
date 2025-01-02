"use client";

import React from "react";

const JoinDiscussion: React.FC = () => {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Join the World Mobile Community",
    description: "Join the World Mobile Club community to discuss mobile phone plans, share reviews, connect with other customers, and stay informed about the latest developments.",
    mainEntity: [
      {
        "@type": "DiscussionForumPosting",
        name: "Mobile Plan Reviews",
        headline: "Share and read genuine reviews of World Mobile phone plans",
        url: "https://worldmobile.club/c/mobile-phone-plans/customer-reviews/123",
        description: "Explore authentic reviews about World Mobile phone plans. Learn from customer experiences to make informed decisions.",
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
        description: "Stay updated on the latest news, celebrate milestones, and collaborate with the World Mobile community.",
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

      <section className="mt-16 max-w-7xl mx-auto px-4 space-y-16">
        {/* Header Section */}
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4 text-center">
          <h2 className="mb-8 text-4xl font-extrabold text-white">
            Engage with the{' '}
            <span className="bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] bg-clip-text text-transparent">
              World Mobile Community
            </span>
          </h2>
          <p className="mb-6 leading-relaxed text-lg text-gray-300">
            Join the World Mobile Club community to share your experience with mobile phone plans, connect with other customers, and stay informed about the latest offerings and updates.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Card 1: Mobile Plan Reviews */}
          <div className="card bg-[rgba(55,10,81,0.19)] text-neutral-content rounded-lg shadow-lg border border-[rgba(255,255,255,0.1)] hover:scale-105 transition-transform">
            <div className="card-body">
              <h3 className="card-title text-2xl font-extrabold text-white">
                Mobile Plan Reviews
              </h3>
              <p className="text-gray-300 leading-relaxed mt-4">
                Explore honest reviews and experiences from customers about World Mobile phone plans.
              </p>
              <div className="mt-6">
                <a
                  href="https://worldmobile.club/c/mobile-phone-plans/customer-reviews/123"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Read reviews of World Mobile phone plans"
                  className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-125 border-none px-6 py-3 rounded-full"
                >
                  Read Reviews
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Visit the Club */}
          <div className="card bg-[rgba(55,10,81,0.19)] text-neutral-content rounded-lg shadow-lg border border-[rgba(255,255,255,0.1)] hover:scale-105 transition-transform">
            <div className="card-body">
              <h3 className="card-title text-2xl font-extrabold text-white">
                Visit the Club
              </h3>
              <p className="text-gray-300 leading-relaxed mt-4">
                Join discussions about World Mobile phone plans, celebrate milestones, and connect with the community.
              </p>
              <div className="mt-6">
                <a
                  href="https://worldmobile.club/c/world-mobile-club/23"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the World Mobile Club for updates and discussions"
                  className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-125 border-none px-6 py-3 rounded-full"
                >
                  Join the Club
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinDiscussion;
