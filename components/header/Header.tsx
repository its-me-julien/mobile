import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
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
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            aria-label="Open menu"
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-gradient-to-br from-[#F6642D] via-[#D42E58] to-[#5A2FBA] text-white rounded-box w-56"
          >
            <li>
              <Link
                href="https://wmtx.worldmobile.club/getting-started-with-world-mobile/"
                className="hover:bg-white hover:bg-opacity-20"
              >
                Getting Started
              </Link>
            </li>
            <li>
              <Link
                href="https://wmtx.worldmobile.club/earn-wmtx/"
                className="hover:bg-white hover:bg-opacity-20"
              >
                Earn WMTx
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
            <li>
              <Link
                href="https://coffee.worldmobile.club/"
                className="hover:bg-white hover:bg-opacity-20"
              >
                Stake
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-6">
        <Link
          href="https://wmtx.worldmobile.club/getting-started-with-world-mobile/"
          className="py-2 px-4 rounded-md transition-all hover:bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] hover:text-white"
        >
          Getting Started
        </Link>
        <Link
          href="https://wmtx.worldmobile.club/earn-wmtx/"
          className="py-2 px-4 rounded-md transition-all hover:bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] hover:text-white"
        >
          Earn WMTx
        </Link>
        <Link
          href="https://worldmobile.club/"
          className="py-2 px-4 rounded-md transition-all hover:bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] hover:text-white"
        >
          Community
        </Link>
        <Link
          href="https://coffee.worldmobile.club/"
          className="py-2 px-4 rounded-md transition-all hover:bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] hover:text-white"
        >
          Stake
        </Link>
      </nav>
    </header>
  );
}
