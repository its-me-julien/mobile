import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


export default function Home() {
  return (
    <div className="font-aeonik-regular">

      <Header />

      <main className="w-full py-10 px-4">
  {/* Page Header */}
  <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4">
    <div>
      <h1 className="text-5xl font-aeonik-bold mb-6 text-black text-center px-4 md:px-6">
        Mobile Plans by{' '}
        <span className="bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] bg-clip-text text-transparent">
          World Mobile
        </span>
      </h1>
      <p className="mb-6 leading-relaxed text-lg text-gray-900 text-center px-4 md:px-6">
        Discover reliable and cost-effective mobile plans. Join the movement with World Mobile and enjoy seamless connectivity nationwide.
      </p>
    </div>
  </div>
</main>

      <Footer />
    </div>
  );
}
