'use client';

import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">LocalFix</span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
                                Home
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
                                Services
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
                                Blog
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
                                About
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200">
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 space-x-4">
                            <button className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                                Login
                            </button>
                            <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-sm transition-all duration-200">
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed */}
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Icon when menu is open */}
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                    <a href="#" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
                        Home
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
                        Services
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
                        Blog
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
                        About
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
                        Contact
                    </a>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <button className="w-full mb-2 px-4 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                            Login
                        </button>
                        <button className="w-full px-4 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-sm transition-all duration-200">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;