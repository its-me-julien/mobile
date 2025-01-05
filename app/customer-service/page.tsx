"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Menu from "../../components/header/Menu";  // Importing the Menu component
import Header from "../../components/header/Header"; // Correct import for the header
import Footer from "../../components/footer/Footer";

const CustomerServiceSupportPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Menu Component */}
      <Menu />

      {/* Header */}
      <Header 
        title="Need Help? World Mobile Support" 
        gradientWords={["World Mobile Support"]} 
        showArrow={false} 
        subtitle="Whether you have a question, need troubleshooting assistance, or want to provide feedback, our support team is here to help you every step of the way."
      />

      {/* Main Content */}
      <main className="flex-grow w-full py-8 px-4">
        <div className="container mx-auto space-y-10">
          {/* Support Summary */}
          <section id="support-summary" aria-labelledby="support-summary-title" className="space-y-6">
            <h2
              id="support-summary-title"
              className="sr-only text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-800"
            >
              Customer Support Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-lg p-8 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <div className="mx-auto w-28 h-28 mb-6">
                  <Image
                    src="/images/contact-min.png"
                    alt="Contact Form Icon"
                    width={112}
                    height={112}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Contact Form</h3>
                <p className="text-sm text-gray-600 mt-4 mb-6">
                  Use the official contact form to get in touch quickly and easily.
                </p>
                <Link
                  href="https://worldmobile.io/en/contact"
                  className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-125 transition-transform transform hover:scale-105 border-none px-12 py-3 rounded-full shadow-lg"
                  aria-label="Go to Contact Form"
                >
                  Go to Contact Form
                </Link>
              </div>

              {/* Email Support */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-lg p-8 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <div className="mx-auto w-28 h-28 mb-6">
                  <Image
                    src="/images/email-min.png"
                    alt="Email Support Icon"
                    width={112}
                    height={112}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Email Support</h3>
                <p className="text-sm text-gray-600 mt-4 mb-6">
                  Send an email to&nbsp;
                  <a
                    href="mailto:esim@worldmobile.io"
                    className="text-[#F6642D] hover:underline"
                  >
                    esim@worldmobile.io
                  </a>
                  , and the team will respond promptly.
                </p>
                <Link
                  href="mailto:esim@worldmobile.io"
                  className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-125 transition-transform transform hover:scale-105 border-none px-12 py-3 rounded-full shadow-lg"
                  aria-label="Send Email to Support"
                >
                  Send Email
                </Link>
              </div>

              {/* The Club Support */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-lg p-8 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <div className="mx-auto w-28 h-28 mb-6">
                  <Image
                    src="/images/support_club-min.png"
                    alt="Club Support Icon"
                    width={112}
                    height={112}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800">The Club Support</h3>
                <p className="text-sm text-gray-600 mt-4 mb-6">
                  Ask the community for advice and assistance on The Club forum.
                </p>
                <Link
                  href="https://worldmobile.club/c/world-mobile-customers/world-mobile-support/20"
                  className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-125 transition-transform transform hover:scale-105 border-none px-12 py-3 rounded-full shadow-lg"
                  aria-label="Visit The Club Support Forum"
                >
                  Visit The Club
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomerServiceSupportPage;
