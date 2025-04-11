// components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current route path
  const { isSignedIn } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", id: "home", directTo: "/" },
    { name: "About", id: "about", directTo: "/about" },
    { name: "Upload", id: "upload", directTo: "/upload" },
    { name: "Pricing", id: "pricing", directTo: "/pricing" },
  ];

  const handleNavClick = (pageId) => {
    setIsOpen(false); // Close mobile menu if open
  };

  // Function to check if the current page matches the nav item
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Container */}
          <div className="flex-shrink-0 flex items-center">
            <div className="h-10 w-50 relative group">
              <div className="transform transition-all duration-300 group-hover:scale-105">
                <svg className="h-full" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 200 50">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1a365d" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.5"/>
                    </linearGradient>
                  </defs>
                  <rect x="5" y="3" width="180" height="40" rx="12" fill="url(#logoGradient)"/>
                  <g className="chart-elements">
                    <rect x="20" y="28" width="8" height="8" fill="#F44242">
                      <animate attributeName="height" values="8;15;8" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="y" values="28;21;28" dur="3s" repeatCount="indefinite" />
                    </rect>
                    <rect x="32" y="20" width="8" height="16" fill="#34a853">
                      <animate attributeName="height" values="16;10;16" dur="3.5s" repeatCount="indefinite" />
                      <animate attributeName="y" values="20;26;20" dur="3.5s" repeatCount="indefinite" />
                    </rect>
                    <rect x="44" y="15" width="8" height="21" fill="#fbbc05">
                      <animate attributeName="height" values="21;26;21" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="y" values="15;10;15" dur="4s" repeatCount="indefinite" />
                    </rect>
                  </g>
                  <defs>
                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#93c5fd" />
                    </linearGradient>
                  </defs>
                  <text x="65" y="32" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" fill="url(#textGradient)" >
                    Vizulytics
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:block flex-grow text-center">
            <div className="flex space-x-8 justify-center">
              {navItems.map((item) => (
                <Link href={item.directTo} key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group
                      ${isActive(item.directTo) ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.name}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transition-transform duration-300 ease-out
                        ${isActive(item.directTo) ? 'transform scale-x-100' : 'transform scale-x-0 group-hover:scale-x-100'}`} 
                    />
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Sign In Button or User Button - Desktop */}
          <div className="hidden sm:flex items-center">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Button and Auth Button */}
          <div className="sm:hidden flex items-center">
            <div className="mr-2">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-1 px-3 rounded-md text-sm transition duration-300 ease-in-out">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden bg-gray-800 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60" : "max-h-0"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link href={item.directTo} key={item.id}>
              <div
                onClick={() => handleNavClick(item.id)}
                className={`group w-full cursor-pointer px-3 py-2 rounded-md text-base font-medium transition-all duration-300
                  ${isActive(item.directTo) ? 'bg-gray-700/70 text-white' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}`}
              >
                <span className="flex items-center">
                  <span 
                    className={`inline-block w-1 h-5 mr-2 rounded-sm transition-all duration-300
                      ${isActive(item.directTo) ? 'bg-purple-500' : 'bg-transparent group-hover:bg-purple-500/50'}`} 
                  />
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}