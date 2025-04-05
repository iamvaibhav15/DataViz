// frontend/app/page.js
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "./home/page";
import About from "./about/page";
import Pricing from "./pricing/page";
import Upload from "./upload/page"
import Footer from "../components/Footer";

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState("home");

  // Function to render content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "upload":
        return <Upload />;
      case "pricing":
        return <Pricing />;
      default:
        return <Home />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar onNavChange={setCurrentPage} currentPage={currentPage} />

      <div className="container mx-auto p-4">
        {renderContent()}
        <Footer/>
      </div>
    </main>
  );
}