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
        <div className="bg-gradient-to-r from-[#5A2FBA] to-[#F6642D] p-8 rounded-xl shadow-2xl border border-gray-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 space-y-6">
          <h2 className="text-3xl font-aeonik-bold text-white">
            Share Your Experience with <span className="text-[#FFFFFF]">World Mobile Phone Plans</span>
          </h2>
          <p className="text-lg font-aeonik-regular text-gray-200 leading-relaxed">
            Your feedback helps others to make confident, informed decisions about their mobile plans.
            By sharing your experience, you contribute to a trusted and reliable community of World Mobile users.
          </p>
          <div className="space-y-4">
            <h3 className="text-2xl font-aeonik-bold text-white">Why Leave a Review Here?</h3>
            <p className="text-base text-gray-200 leading-relaxed">
              At World Mobile Club, reviews are written by actual customers and presented without bias.
              Our independent, community-driven platform provides transparency by showcasing both positive and negative experiences.
              This means you’ll get an honest glimpse into what it’s really like to be a World Mobile customer.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-aeonik-bold text-white">Tips for Writing a Great Review</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faInfoCircle} className="text-white text-2xl" />
                <p className="text-base text-gray-200">
                  <strong className="text-white">Be Specific:</strong> Include details like plan features, customer service, and pricing.
                  Clear examples help others understand your experience.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faBullhorn} className="text-white text-2xl" />
                <p className="text-base text-gray-200">
                  <strong className="text-white">Stay Honest:</strong> Share truthful feedback about what you liked
                  and where improvements could be made.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-white text-2xl" />
                <p className="text-base text-gray-200">
                  <strong className="text-white">Talk About Your Journey:</strong> Describe your experience from start to finish,
                  including activation, customer service, and usage. Clear and detailed reviews are the most helpful.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6 rounded-xl shadow-2xl border border-gray-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300">
          <h2 className="text-2xl font-aeonik-bold text-black mb-4">Post a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
            <textarea
              id="feedback"
              name="feedback"
              placeholder="Write your feedback here..."
              value={formData.feedback}
              onChange={handleInputChange}
              required
              className="textarea textarea-bordered w-full h-28 bg-gray-200 text-black text-sm focus:ring-[#5A2FBA] focus:border-[#5A2FBA]"
            />
            <div>
              <p className="text-sm font-semibold text-black mb-2">
                Would you recommend World Mobile?
              </p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`btn border-0 w-32 flex items-center justify-center space-x-2 ${
                    formData.recommend === "Yes"
                      ? "bg-[#F6642D] text-white"
                      : "bg-gray-300 text-black"
                  } hover:bg-[#F6642D]`}
                  onClick={() => setFormData({ ...formData, recommend: "Yes" })}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span>Yes</span>
                </button>
                <button
                  type="button"
                  className={`btn border-0 w-32 flex items-center justify-center space-x-2 ${
                    formData.recommend === "No"
                      ? "bg-[#F6642D] text-white"
                      : "bg-gray-300 text-black"
                  } hover:bg-[#F6642D]`}
                  onClick={() => setFormData({ ...formData, recommend: "No" })}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                  <span>No</span>
                </button>
              </div>
            </div>
            <div className="space-y-3">
  <input
    type="text"
    id="name"
    name="name"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleInputChange}
    className="input input-bordered w-full bg-gray-200 text-black text-sm focus:ring-[#5A2FBA] focus:border-[#5A2FBA]"
  />
  {/* Removed fieldErrors.name */}

  <div className="grid grid-cols-2 gap-4">
    <div>
      <input
        type="text"
        id="city"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleInputChange}
        className="input input-bordered w-full bg-gray-200 text-black text-sm focus:ring-[#5A2FBA] focus:border-[#5A2FBA]"
      />
      {/* Removed fieldErrors.city */}
    </div>
    <div>
      <input
        type="text"
        id="zipcode"
        name="zipcode"
        placeholder="Zip Code"
        value={formData.zipcode}
        onChange={handleInputChange}
        className="input input-bordered w-full bg-gray-200 text-black text-sm focus:ring-[#5A2FBA] focus:border-[#5A2FBA]"
      />
      {/* Removed fieldErrors.zipcode */}
    </div>
  </div>
</div>
<div className="relative">
  <input
    type="email"
    id="email"
    name="email"
    placeholder="Your email (optional)"
    value={formData.email}
    onChange={handleInputChange}
    className="input input-bordered w-full bg-gray-200 text-black text-sm focus:ring-[#5A2FBA] focus:border-[#5A2FBA]"
  />
  {/* Removed fieldErrors.email */}
  <div
    className="absolute top-1/2 transform -translate-y-1/2 right-2 tooltip tooltip-left"
    data-tip="Your email will not be published or used to contact you."
  >
    <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500 cursor-pointer" />
  </div>
</div>



            <ReCAPTCHA
              sitekey="6LfrRqoqAAAAAB5QBGNidW0WHHZIgocAHTibFnLi"
              onChange={handleCaptchaChange}
            />
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#F6642D] to-[#D42E58] text-white hover:brightness-125 border-0"
            >
              Post Review
            </button>
          </form>
        </div>
      </div>

      {status && (
        <div
          className={`mt-4 text-center text-sm font-semibold p-4 rounded-lg ${
            status.startsWith("Error") ? "bg-[#D42E58] text-white" : "bg-green-500 text-white"
          }`}
        >
          {status.startsWith("Error") ? (
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
          ) : (
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
          )}
          {status}
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
