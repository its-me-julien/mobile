"use client";

import React from "react";
import Link from "next/link";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-[#0e0525] font-aeonik-regular">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-aeonik-bold text-white mb-4">
          Oops! <span className="bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] bg-clip-text text-transparent">Disconnected</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Looks like you&apos;ve wandered out of range—don&apos;t worry, reconnecting is what we do best! Let&apos;s get you back on track and plugged into the World Mobile ecosystem.
        </p>
        <Link
          href="/"
          className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-125 border-none px-12 py-3 rounded-full"
        >
          Rejoin the Network
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
