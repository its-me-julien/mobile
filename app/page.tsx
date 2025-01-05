import React from 'react';
import Menu from '../components/header/Menu';  // Importing the Menu component
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MobilePlansSection from '../components/homepage/MobilePlansSection';  // Import the updated section

export default function Home() {
  return (
    <div className="font-aeonik-regular bg-white">
      <Menu /> {/* Adding the Menu component */}
      <Header 
        title="Mobile Plans by World Mobile" 
        gradientWords={["World Mobile"]}  // Matching the full phrase "World Mobile"
        showArrow={false} // No arrow
        subtitle="Discover reliable and cost-effective mobile plans. Join the movement with World Mobile and enjoy seamless connectivity nationwide."
      />

      <main className="w-full">
        {/* Transition to the full-width mobile plans section */}
        <MobilePlansSection /> {/* Updated section with full width and transition */}
      </main>

      <Footer />
    </div>
  );
}
