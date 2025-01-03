"use client";

import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faBullhorn, faCheckCircle, faExclamationCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
import RatingField from "./RatingField";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const ReviewSchema = z.object({
  overallRating: z.number().min(1).max(5),
  serviceRating: z.number().min(1).max(5),
  pricingRating: z.number().min(1).max(5),
  speedRating: z.number().min(1).max(5),
  feedback: z.string().max(3500),
  recommend: z.enum(["Yes", "No"]),
  name: z.string().max(50),
  city: z.string().max(60),
  zipcode: z.string().max(20),
  email: z.string().email().or(z.literal("")),
});

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    overallRating: 5,
    serviceRating: 5,
    pricingRating: 5,
    speedRating: 5,
    feedback: "",
    recommend: "Yes",
    name: "",
    city: "",
    zipcode: "",
    email: "",
  });
  const [status, setStatus] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeHtml(value);

    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");
  
    console.log("Form data before submission:", formData);
  
    const parseResult = ReviewSchema.safeParse(formData);
  
    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues.map((issue) => issue.message).join(", ");
      setStatus(`Validation failed: ${errorMessages}`);
      console.error("Validation errors:", parseResult.error.issues);
      return;
    }
  
    if (!captchaToken) {
      setStatus("Please complete the CAPTCHA");
      console.warn("CAPTCHA token missing");
      return;
    }
  
    try {
      const response = await fetch("/.netlify/functions/submitReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parseResult.data,
          captchaToken,
          reviewType: "mobileplan",
        }),
      });
  
      const result = await response.json();
  
      console.log("Server response:", result);
  
      if (response.ok) {
        setStatus("Review submitted successfully!");
        setFormData({
          overallRating: 5,
          serviceRating: 5,
          pricingRating: 5,
          speedRating: 5,
          feedback: "",
          recommend: "Yes",
          name: "",
          city: "",
          zipcode: "",
          email: "",
        });
        setCaptchaToken(null);
      } else {
        setStatus(`Error: ${result.error || "Something went wrong"}`);
        console.error("Server error response:", result);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("An unexpected error occurred.");
    }
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
       
      <div className="bg-gradient-to-r from-[#5A2FBA] to-[#F6642D] p-6 rounded-xl shadow-2xl border border-gray-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 space-y-6">
  {/* Header Section */}
  <h2 className="text-xl font-semibold text-white leading-snug">
    Share Your Experience with <span className="text-white">World Mobile Phone Plans</span>
  </h2>
  <p className="text-sm text-gray-200 leading-relaxed">
    Help others make informed decisions by sharing your experience with World Mobile’s phone plans. Your insights can guide others to choose the right plan for their needs.
  </p>

  {/* Why Leave a Review Section */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Why Leave a Review?</h3>
    <p className="text-sm text-gray-200 leading-relaxed">
      Real customer reviews provide valuable insights into the service quality, pricing, and reliability of World Mobile phone plans. Your honest feedback helps build trust within the community.
    </p>
  </div>

  {/* Tips for Writing a Review */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Tips for Writing a Helpful Review</h3>
    <ul className="space-y-3 list-disc list-inside text-sm text-gray-200">
      <li>
        <strong className="text-white">Be Specific:</strong> Talk about plan features, network coverage, and customer support. Include clear examples to make your review more useful.
      </li>
      <li>
        <strong className="text-white">Stay Honest:</strong> Share both the positives and areas for improvement in your experience with World Mobile.
      </li>
      <li>
        <strong className="text-white">Describe Your Experience:</strong> Include details like activation, ease of use, and how well the plan met your needs.
      </li>
    </ul>
  </div>
</div>


        <div className="bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6 rounded-xl shadow-2xl border border-gray-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300">
          <h2 className="text-2xl font-aeonik-bold text-black mb-4">Post a Review</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
  {/* Rating Fields */}
  <div className="space-y-6">
    <RatingField
      label="Overall Rating"
      name="overallRating"
      value={formData.overallRating}
      onChange={handleRatingChange}
    />
    <RatingField
      label="Pricing"
      name="pricingRating"
      value={formData.pricingRating}
      onChange={handleRatingChange}
    />
    <RatingField
      label="Service"
      name="serviceRating"
      value={formData.serviceRating}
      onChange={handleRatingChange}
    />
    <RatingField
      label="Speed"
      name="speedRating"
      value={formData.speedRating}
      onChange={handleRatingChange}
    />
  </div>

  {/* Feedback */}
  <textarea
    id="feedback"
    name="feedback"
    placeholder="Write your feedback here..."
    value={formData.feedback}
    onChange={handleInputChange}
    required
    className="textarea textarea-bordered w-full h-32 bg-gray-50 text-gray-800 text-base rounded-lg shadow-sm focus:ring-[#5A2FBA] focus:outline-none placeholder-gray-400 hover:ring-2 hover:ring-gray-300 transition-all"
  />

  {/* Recommendation */}
  <div>
    <p className="text-sm font-medium text-gray-800 mb-3">
      Would you recommend World Mobile?
    </p>
    <div className="flex space-x-4">
      {["Yes", "No"].map((option) => (
        <button
          key={option}
          type="button"
          className={`btn border w-36 flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg ${
            formData.recommend === option
              ? "bg-[#F6642D] text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-gray-300 transition-colors`}
          onClick={() => setFormData({ ...formData, recommend: option })}
        >
          <FontAwesomeIcon
            icon={option === "Yes" ? faThumbsUp : faThumbsDown}
          />
          <span className="ml-2">{option}</span>
        </button>
      ))}
    </div>
  </div>

  {/* User Information */}
  <div className="space-y-6">
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Your Name"
      value={formData.name}
      onChange={handleInputChange}
      className="input input-bordered w-full bg-gray-50 text-gray-800 text-base rounded-lg shadow-sm focus:ring-[#5A2FBA] focus:outline-none placeholder-gray-400 hover:ring-2 hover:ring-gray-300 transition-all"
    />
    <div className="grid grid-cols-2 gap-6">
      <input
        type="text"
        id="city"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleInputChange}
        className="input input-bordered w-full bg-gray-50 text-gray-800 text-base rounded-lg shadow-sm focus:ring-[#5A2FBA] focus:outline-none placeholder-gray-400 hover:ring-2 hover:ring-gray-300 transition-all"
      />
      <input
        type="text"
        id="zipcode"
        name="zipcode"
        placeholder="Zip Code"
        value={formData.zipcode}
        onChange={handleInputChange}
        className="input input-bordered w-full bg-gray-50 text-gray-800 text-base rounded-lg shadow-sm focus:ring-[#5A2FBA] focus:outline-none placeholder-gray-400 hover:ring-2 hover:ring-gray-300 transition-all"
      />
    </div>
  </div>

  {/* Email Input with Tooltip */}
  <div className="relative">
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Your email (optional)"
      value={formData.email}
      onChange={handleInputChange}
      className="input input-bordered w-full bg-gray-50 text-gray-800 text-base rounded-lg shadow-sm focus:ring-[#5A2FBA] focus:outline-none placeholder-gray-400 hover:ring-2 hover:ring-gray-300 transition-all"
    />
    <div
      className="absolute top-1/2 transform -translate-y-1/2 right-4 tooltip tooltip-left"
      data-tip="Your email will not be published or used to contact you."
    >
      <FontAwesomeIcon
        icon={faInfoCircle}
        className="text-gray-500 cursor-pointer"
      />
    </div>
  </div>

  {/* CAPTCHA */}
  <ReCAPTCHA
    sitekey="6LfrRqoqAAAAAB5QBGNidW0WHHZIgocAHTibFnLi"
    onChange={handleCaptchaChange}
  />

  {/* Submit Button */}
  <button
    type="submit"
    className="btn w-full py-3 bg-gradient-to-r from-[#F6642D] to-[#D42E58] text-white font-medium rounded-lg hover:brightness-110 shadow-sm border-0"
  >
    Post Review
  </button>
</form>
        </div>
      </div>

      {status && (
  <div
    className={`mt-4 text-center text-sm font-medium p-4 rounded-lg shadow-sm ${
      status.startsWith("Error")
        ? "bg-[#D42E58] text-white"
        : "bg-[#5A2FBA] text-white"
    }`}
  >
    <FontAwesomeIcon
      icon={status.startsWith("Error") ? faExclamationCircle : faCheck}
      className="mr-2"
    />
    {status}
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
