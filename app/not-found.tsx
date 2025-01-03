"use client";

import React from "react";
import Link from "next/link";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />

      <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4">
    <div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-black text-center px-6 md:px-8 py-4 md:py-6 mb-8">
            Oops! <br />
            <span className="bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] bg-clip-text text-transparent">Disconnected</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-900 text-center px-4 md:px-6">
            Looks like you&apos;ve wandered out of range—don&apos;t worry, reconnecting is what we do best! Let&apos;s get you back on track and plugged into the World Mobile ecosystem.
        </p>
        <Link
            href="/"
            className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-125 border-none px-12 py-3 rounded-full mx-auto block"
        >
            Rejoin the Network
        </Link>
    </div>
</div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
