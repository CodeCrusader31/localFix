"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function ServiceNeederNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    window.location.href = "/";
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">LocalFix</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
              Services
            </Link>
            <Link href="/bookings" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
              My Bookings
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
              Blog
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
              Contact
            </Link>
            
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobile}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link 
            href="/" 
            onClick={toggleMobile}
            className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link 
            href="/services" 
            onClick={toggleMobile}
            className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </Link>
          <Link 
            href="/bookings" 
            onClick={toggleMobile}
            className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            My Bookings
          </Link>
          <Link 
            href="/blog" 
            onClick={toggleMobile}
            className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            onClick={toggleMobile}
            className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            onClick={toggleMobile}
            className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <button
              onClick={() => {
                toggleMobile();
                handleLogout();
              }}
              className="w-full px-4 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}