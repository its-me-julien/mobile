import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
  return (
    <footer className="footer bg-gradient-to-r from-black to-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* First Box */}
        <div>
          <h2 className="text-xl font-bold mb-3">The Club</h2>
          <p className="text-gray-400 text-sm">
            World Mobile Club Community-Powered Hub.
          </p>
        </div>

        {/* Second Box - Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                className="link no-underline hover:text-[#F6642D] text-sm flex items-center"
                href="https://wmtx.worldmobile.club/getting-started-with-world-mobile"
                title="Getting Started with World Mobile"
              >
                <i className="fas fa-chevron-right text-xs mr-2"></i> Getting Started
              </a>
            </li>
            <li>
              <a
                className="link no-underline hover:text-[#F6642D] text-sm flex items-center"
                href="https://wmtx.worldmobile.club/official-world-mobile-links"
                title="Official World Mobile Links"
              >
                <i className="fas fa-chevron-right text-xs mr-2"></i> Official Links
              </a>
            </li>
          </ul>
        </div>

        {/* Third Box - WMTx Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">WMTx</h3>
          <ul className="space-y-2">
            <li>
              <a
                className="link no-underline hover:text-[#F6642D] text-sm flex items-center"
                href="https://wmtx.worldmobile.club/earn-wmtx/"
                title="Ways to Earn WMTx"
              >
                <i className="fas fa-coins text-xs mr-2"></i> Ways to Earn
              </a>
            </li>
            <li>
              <a
                className="link no-underline hover:text-[#F6642D] text-sm flex items-center"
                href="https://wmtx.worldmobile.club/where-to-buy-wmtx/"
                title="Where to Buy WMTx"
              >
                <i className="fas fa-shopping-cart text-xs mr-2"></i> Where to Buy
              </a>
            </li>
          </ul>
        </div>

        {/* Fourth Box - Customers Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">Customers</h3>
          <ul className="space-y-2">
            <li>
              <a
                className="link no-underline hover:text-[#F6642D] text-sm flex items-center"
                href="https://wmtx.worldmobile.club/broadband-reviews"
                title="Home Broadband Reviews"
              >
                <i className="fas fa-home text-xs mr-2"></i> Home Broadband Reviews
              </a>
            </li>
            <li>
              <a
                className="link no-underline hover:text-[#F6642D] text-sm flex items-center"
                href="https://wmtx.worldmobile.club/mobile-phone-plan-reviews"
                title="Phone Plan Reviews"
              >
                <i className="fas fa-mobile-alt text-xs mr-2"></i> Phone Plan Reviews
              </a>
            </li>
            <li>
              <a
                className="link no-underline hover:text-[#F6642D] text-sm flex items-center"
                href="https://wmtx.worldmobile.club/support/"
                title="Support"
              >
                <i className="fas fa-life-ring text-xs mr-2"></i> Support
              </a>
            </li>
          </ul>
        </div>

        {/* Fifth Box - Support Us Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">Support Us</h3>
          <ul className="space-y-2">
            <li>
              <a
                className="link no-underline hover:text-[#F6642D] text-sm flex items-center"
                href="https://coffee.worldmobile.club/"
                target="_blank"
                rel="noopener noreferrer"
                title="Stake with Coffee"
              >
                <i className="fas fa-mug-hot text-xs mr-2"></i> Stake with Coffee Earth Nodes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
