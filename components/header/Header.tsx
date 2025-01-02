"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar bg-black text-white shadow-lg sticky top-0 z-50">
      {/* Logo and Branding */}
      <div className="flex-1 flex items-center space-x-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/club_logo.png"
            alt="World Mobile Logo"
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <span className="text-2xl font-extrabold tracking-wide">
            World Mobile Club
          </span>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            onClick={toggleMenu}
            className="btn btn-ghost btn-circle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
          {menuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-gradient-to-br from-[#F6642D] via-[#D42E58] to-[#5A2FBA] text-white rounded-box w-56"
            >
              <li>
                <Link
                  href="https://plans.worldmobile.club/reviews/"
                  className="hover:bg-white hover:bg-opacity-20"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="https://worldmobile.club/"
                  className="hover:bg-white hover:bg-opacity-20"
                >
                  Community
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-6">
        <Link
          href="https://plans.worldmobile.club/reviews/"
          className="py-2 px-4 rounded-md transition-all hover:bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] hover:text-white"
        >
          Reviews
        </Link>
        <Link
          href="https://worldmobile.club/"
          className="py-2 px-4 rounded-md transition-all hover:bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] hover:text-white"
        >
          Community
        </Link>
      </nav>
    </header>
  );
}
