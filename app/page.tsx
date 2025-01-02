import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


export default function Home() {
  return (
    <div className="font-aeonik-regular">

      <Header />

      <main className="w-full py-10 px-4 bg-gradient-to-b from-black via-[#150a2c] to-[#000000]">
        {/* Page Header */}
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4">
          <div>
            <h1 className="text-5xl font-aeonik-bold mb-6 text-white text-center px-4 md:px-6">
              Getting started with{' '}
              <span className="bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] bg-clip-text text-transparent">
                World Mobile
              </span>
            </h1>
            <p className="mb-6 leading-relaxed text-lg text-gray-300 text-center px-4 md:px-6">
              World Mobile brings connectivity to communities worldwide through decentralized infrastructure.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
