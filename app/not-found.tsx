"use client";

import React from "react";
import Link from "next/link";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const NotFoundPage: React.FC = () => {
  return (
    <div className="font-aeonik-regular">
      <Header />
      <main className="w-full py-10 px-4">
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-black text-center px-6 md:px-8 py-4 md:py-6 mb-8">
              Oops! <br />
              <span className="bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] bg-clip-text text-transparent">
                Disconnected
              </span>
            </h1>
            <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-900 text-center px-4 md:px-6">
              Looks like you&apos;ve wandered out of range—don&apos;t worry, reconnecting is what we do best! Let&apos;s get you back on track and plugged into the World Mobile ecosystem.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-125 transition-transform transform hover:scale-105 border-none px-14 py-4 rounded-full shadow-lg"
              >
                Rejoin the Network
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
