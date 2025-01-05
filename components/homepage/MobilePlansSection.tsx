import React from "react";
import Link from "next/link";

const MobilePlansSection: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] py-20 mt-12">
      {/* Transitioning background or divider */}
      <div className="h-1 bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] mb-12"></div>

      {/* Content with max-width to center and ensure readability */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Card 1: USA National Phone Plan */}
          <div className="bg-white/95 opacity-95 p-8 rounded-xl shadow-lg hover:bg-white hover:opacity-100 hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="h-48 bg-gray-300 rounded-lg mb-6"></div> {/* Placeholder for Image */}
            <h3 className="text-3xl font-aeonik-bold text-[#3B2A45] mb-4 tracking-wide leading-tight">
              USA National Phone Plan
            </h3>
            <p className="text-lg font-aeonik-regular text-gray-800 prose">
              Stay connected across the USA with our affordable national mobile plans. Enjoy seamless coverage, excellent customer support, and great pricing.
            </p>
            {/* Button with improved spacing */}
            <Link
              href="/"
              className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-110 transition-all duration-200 ease-in-out border-none px-16 py-4 rounded-full shadow-lg hover:shadow-xl mt-6"
            >
              Rejoin the Network
            </Link>
          </div>

          {/* Card 2: International Travel SIM */}
          <div className="bg-white/95 opacity-95 p-8 rounded-lg shadow-lg hover:bg-white hover:opacity-100 hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="h-48 bg-gray-300 rounded-lg mb-6"></div> {/* Placeholder for Image */}
            <h3 className="text-3xl font-aeonik-bold text-[#3B2A45] mb-4 tracking-wide leading-tight">
              International Travel SIM
            </h3>
            <p className="text-lg font-aeonik-regular text-gray-800 prose">
              Travel the world with ease using our International Travel SIM. Stay connected globally without breaking the bank, with coverage in over 100 countries.
            </p>
            {/* Button with improved spacing */}
            <Link
              href="/"
              className="btn bg-gradient-to-r from-[#5A2FBA] to-[#D42E58] text-white hover:brightness-110 transition-all duration-200 ease-in-out border-none px-16 py-4 rounded-full shadow-lg hover:shadow-xl mt-6"
            >
              Rejoin the Network
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePlansSection;
