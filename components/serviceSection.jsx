'use client';

import React, { useState } from 'react';

const ServicesSection = () => {
    const [activeCategory, setActiveCategory] = useState('home-services');

    const serviceCategories = {
        'home-services': {
            title: 'Home Services',
            services: [
                'Deep Cleaning',
                'Move-In/Move-Out Cleaning',
                'Carpet Cleaning',
                'Office Cleaning',
                'Post-Construction Cleaning'
            ]
        },
        'repair-maintenance': {
            title: 'Repair & Maintenance',
            services: [
                'Plumbing Repairs',
                'Electrical Fixes',
                'Appliance Repair',
                'Furniture Assembly',
                'Door & Lock Repair'
            ]
        },
        'tech-services': {
            title: 'Tech Services',
            services: [
                'TV Mounting',
                'Smart Home Setup',
                'Computer Repair',
                'Network Installation',
                'Home Theater Setup'
            ]
        },
        'outdoor-services': {
            title: 'Outdoor Services',
            services: [
                'Lawn Care',
                'Gardening',
                'Fence Repair',
                'Deck Staining',
                'Pressure Washing'
            ]
        },
        'personal-help': {
            title: 'Personal Help',
            services: [
                'Personal Assistant',
                'Event Help',
                'Shopping Assistance',
                'Senior Care Assistance',
                'Pet Sitting'
            ]
        }
    };

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
    };

    return (
        <section className="py-16 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
                        Popular Services
                    </h2>
                    <p className="text-lg text-indigo-700 max-w-2xl mx-auto">
                        Discover the most requested services from our trusted local professionals
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {Object.entries(serviceCategories).map(([id, category]) => (
                        <button
                            key={id}
                            onClick={() => handleCategoryChange(id)}
                            className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === id 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'bg-white text-indigo-700 border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200'
                            }`}
                        >
                            {category.title}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceCategories[activeCategory].services.map((service, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100 cursor-pointer hover:border-indigo-200"
                            onClick={() => console.log(`Selected service: ${service}`)}
                        >
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">{service}</h3>
                                    <p className="text-indigo-700 text-sm">
                                        Professional {service.toLowerCase()} services by verified local experts
                                    </p>
                                    <div className="mt-4 flex items-center">
                                        <span className="text-indigo-600 font-medium">From ₹499</span>
                                        <span className="mx-2 text-indigo-200">•</span>
                                        <div className="flex items-center text-yellow-400">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm text-indigo-600 ml-1">4.8 (2.1k)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <button className="px-8 py-3 bg-white border border-indigo-500 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors duration-300">
                        View All Services
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;