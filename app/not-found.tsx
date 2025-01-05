"use client";

import React from "react";
import Link from "next/link";
import Menu from "../components/header/Menu";  // Import the Menu component
import Header from "../components/header/Header"; // Correct import for Header
import Footer from "../components/footer/Footer";

const NotFoundPage: React.FC = () => {
  return (
    <div className="font-aeonik-regular">
      {/* Menu Component */}
      <Menu />

      {/* Header with dynamic title and subtitle */}
      <Header 
        title="Oops! You're Disconnected" 
        gradientWords={["You're Disconnected"]} 
        showArrow={false} 
        subtitle="Looks like you've wandered out of range—don't worry, reconnecting is what we do best! Let’s get you back on track and plugged into the World Mobile ecosystem."
      />

      <main className="w-full py-10 px-4">
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4">
          <div>
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
