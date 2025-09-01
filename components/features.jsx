'use client';

import React, { useState, useEffect } from 'react';

const AnimatedGradientSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const features = [
        {
            title: "Instant Matching",
            description: "Connect with the best local professionals in seconds",
            icon: "🤝"
        },
        {
            title: "Verified Experts",
            description: "All service providers are background-checked and rated",
            icon: "✅"
        },
        {
            title: "Transparent Pricing",
            description: "No hidden fees. Know the cost before you book",
            icon: "💸"
        },
        {
            title: "24/7 Support",
            description: "Our team is always here to help you",
            icon: "🌙"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setActiveIndex((prev) => (prev + 1) % features.length);
                setIsAnimating(false);
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 text-gray-800 overflow-hidden">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                        Why Choose LocalFix?
                    </span>
                    <div className="absolute -top-2 -right-6 w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                </h2>
                
                <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
                    Experience the future of local services with our innovative platform designed to make your life easier.
                </p>

                {/* Animated Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className={`p-6 rounded-2xl bg-white bg-opacity-80 backdrop-blur-sm border border-white border-opacity-30 shadow-lg transition-all duration-700 transform ${
                                index === activeIndex 
                                    ? 'scale-105 shadow-xl ring-2 ring-blue-300 ring-opacity-50' 
                                    : 'scale-95 opacity-80'
                            } ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}
                            onMouseEnter={() => {
                                setIsAnimating(true);
                                setTimeout(() => {
                                    setActiveIndex(index);
                                    setIsAnimating(false);
                                }, 300);
                            }}
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-blue-800">{feature.title}</h3>
                            <p className="text-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Animated Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="p-4 bg-white bg-opacity-70 rounded-xl border border-white border-opacity-30">
                        <div className="text-3xl font-bold text-blue-700 mb-2">50K+</div>
                        <div className="text-gray-700">Happy Customers</div>
                    </div>
                    <div className="p-4 bg-white bg-opacity-70 rounded-xl border border-white border-opacity-30">
                        <div className="text-3xl font-bold text-blue-700 mb-2">5K+</div>
                        <div className="text-gray-700">Verified Experts</div>
                    </div>
                    <div className="p-4 bg-white bg-opacity-70 rounded-xl border border-white border-opacity-30">
                        <div className="text-3xl font-bold text-blue-700 mb-2">200+</div>
                        <div className="text-gray-700">Cities</div>
                    </div>
                    <div className="p-4 bg-white bg-opacity-70 rounded-xl border border-white border-opacity-30">
                        <div className="text-3xl font-bold text-blue-700 mb-2">98%</div>
                        <div className="text-gray-700">Satisfaction Rate</div>
                    </div>
                </div>

                {/* Animated CTA Button */}
                {/* <button className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 group overflow-hidden">
                    <span className="relative z-10">Get Started Today</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-20"></div>
                    </div>
                </button> */}

                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-float-1"></div>
                <div className="absolute top-1/3 right-16 w-16 h-16 bg-indigo-400 rounded-full opacity-20 animate-float-2"></div>
                <div className="absolute bottom-40 left-20 w-12 h-12 bg-sky-400 rounded-full opacity-20 animate-float-3"></div>
                <div className="absolute bottom-1/4 right-24 w-10 h-10 bg-blue-300 rounded-full opacity-20 animate-float-4"></div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(5deg); }
                    66% { transform: translateY(10px) rotate(-5deg); }
                }
                .animate-float-1 {
                    animation: float 15s ease-in-out infinite;
                }
                .animate-float-2 {
                    animation: float 18s ease-in-out infinite;
                    animation-delay: 1s;
                }
                .animate-float-3 {
                    animation: float 12s ease-in-out infinite;
                    animation-delay: 2s;
                }
                .animate-float-4 {
                    animation: float 20s ease-in-out infinite;
                    animation-delay: 3s;
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </section>
    );
};

export default AnimatedGradientSection;