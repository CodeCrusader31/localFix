'use client';

import React, { useState, useEffect } from 'react';

const Header = () => {
    const quotes = [
        {
            hindi: "Apne sheher ke experts, ab ek click ki doori par.",
            english: "Experts from your city, just a click away."
        },
        {
            hindi: "Har ghar ka kaam, local haathon se aasan.",
            english: "Every household task, made easy with local hands."
        },
        {
            hindi: "Bharosa bhi, suvidha bhi — aapke apne logon se.",
            english: "Trust and convenience — from your own people."
        },
        {
            hindi: "Apna kaam, apne log.",
            english: "Your work, your people."
        },
        {
            hindi: "Mohalle se mahal tak, service aapke saath.",
            english: "From neighborhood to mansion, service at your side."
        }
    ];

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) => 
                    prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
                );
                setIsAnimating(false);
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Search functionality here
        console.log("Searching for:", searchTerm);
    };

    return (
        <header className="relative p-8 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 text-gray-800 text-center overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-100"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-indigo-100"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-sky-100"></div>
            </div>
            
            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="mb-10 min-h-[160px] flex flex-col justify-center">
                    <div className={`transform transition-all duration-700 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        <h2 className="text-4xl md:text-5xl mb-4 font-bold tracking-tight text-indigo-900">
                            {quotes[currentQuoteIndex].hindi}
                        </h2>
                        <p className="text-xl md:text-2xl text-indigo-700 font-light max-w-2xl mx-auto">
                            {quotes[currentQuoteIndex].english}
                        </p>
                    </div>
                    
                    {/* Quote indicators */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {quotes.map((_, index) => (
                            <button 
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentQuoteIndex ? 'bg-indigo-500 scale-125' : 'bg-indigo-200'}`}
                                onClick={() => {
                                    setIsAnimating(true);
                                    setTimeout(() => {
                                        setCurrentQuoteIndex(index);
                                        setIsAnimating(false);
                                    }, 500);
                                }}
                                aria-label={`Go to quote ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
                
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search for local services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 rounded-full text-base outline-none text-gray-700 bg-white border border-indigo-100 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                        />
                        <svg 
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <button 
                        type="submit"
                        className="px-8 py-4 bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-full cursor-pointer text-base font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Search
                    </button>
                </form>
                
               
                <button className="relative px-8 py-4 top-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 group overflow-hidden">
                    <span className="relative z-10">Get Started Today</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-20"></div>
                    </div>
                </button>
            </div>
           
        </header>
    );
};

export default Header;