// components/Navbar.jsx
"use client";

import { useState } from 'react';

export default function Navbar({ onNavChange, currentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Upload', id: 'upload' },
    { name: 'Pricing', id: 'pricing' }
  ];

  const handleNavClick = (pageId) => {
    onNavChange(pageId);
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Container - Left aligned */}
          <div className="flex-shrink-0 flex items-center">
            <div className="h-10 w-50 relative group">
              {/* SVG Logo with hover effect - the logo scales slightly on hover */}
              <div className="transform transition-all duration-300 group-hover:scale-105">
                <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
                  {/* Backdrop gradient */}
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1a365d" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.5"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Background Shape */}
                  <rect x="5" y="3" width="180" height="40" rx="12" fill="url(#logoGradient)"/>
                  
                  {/* Viz Animation Elements */}
                  <g className="chart-elements">
                    {/* Bar Chart Element with hover animation */}
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
                    
                    {/* Pulse effect for data points */}
                    {/* <circle cx="65" cy="30" r="3" fill="#4285f4">
                      <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
                    </circle> */}
                    
                    {/* Line Chart Element with animation */}
                    {/* <path d="M60 30 L75 18 L90 25 L105 12" stroke="#ea4335" strokeWidth="2.5" fill="none">
                      <animate attributeName="d" values="M60 30 L75 18 L90 25 L105 12;M60 27 L75 21 L90 22 L105 15;M60 30 L75 18 L90 25 L105 12" dur="5s" repeatCount="indefinite" />
                    </path>
                    <circle cx="60" cy="30" r="2.5" fill="#ea4335">
                      <animate attributeName="cy" values="30;27;30" dur="5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="75" cy="18" r="2.5" fill="#ea4335">
                      <animate attributeName="cy" values="18;21;18" dur="5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="90" cy="25" r="2.5" fill="#ea4335">
                      <animate attributeName="cy" values="25;22;25" dur="5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="105" cy="12" r="2.5" fill="#ea4335">
                      <animate attributeName="cy" values="12;15;12" dur="5s" repeatCount="indefinite" />
                    </circle> */}
                  </g>
                  
                  {/* Logo Text with gradient */}
                  <defs>
                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff"/>
                      <stop offset="100%" stopColor="#93c5fd"/>
                    </linearGradient>
                  </defs>
                  <text x="65" y="32" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" fill="url(#textGradient)">Vizulytics</text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation - Center */}
          <div className="hidden sm:block flex-grow text-center">
            <div className="flex space-x-8 justify-center">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 
                    ${currentPage === item.id
                      ? 'text-purple-400'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {item.name}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform transition-transform duration-300 ease-out 
                      ${currentPage === item.id 
                        ? 'scale-x-100' 
                        : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button - right aligned */}
          <div className="sm:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Slide down animation */}
      <div className={`sm:hidden bg-gray-800 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`group w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300
                ${currentPage === item.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
            >
              <span className="flex items-center">
                <span className={`inline-block w-1 h-5 mr-2 rounded-sm transition-all duration-300
                  ${currentPage === item.id 
                    ? 'bg-purple-500' 
                    : 'bg-transparent group-hover:bg-purple-500/50'
                  }`}
                />
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}