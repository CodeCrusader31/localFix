// 'use client';
// import React, { useState } from 'react';

// const RepairMaintenanceCarousel = () => {
//   const services = [
//     {
//       title: 'Plumbing Repairs',
//       description: 'Fix leaks, clogs, and other plumbing issues with expert technicians',
//       icon: '🔧',
//       price: '$80-200',
//       image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
//     },
//     {
//       title: 'Electrical Fixes',
//       description: 'Professional electrical repairs and installations for your home',
//       icon: '⚡',
//       price: '$100-250',
//       image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
//     },
//     {
//       title: 'Appliance Repair',
//       description: 'Expert repair for all major home appliances',
//       icon: '🏠',
//       price: '$90-180',
//       image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
//     },
//     {
//       title: 'Furniture Assembly',
//       description: 'Professional assembly for all types of furniture',
//       icon: '🪑',
//       price: '$60-150',
//       image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
//     },
//     {
//       title: 'Door & Lock Repair',
//       description: 'Fix doors, locks, and hardware issues',
//       icon: '🚪',
//       price: '$70-160',
//       image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
//     }
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextService = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === services.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevService = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? services.length - 1 : prevIndex - 1
//     );
//   };

//   const goToService = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="w-full min-h-screen bg-white px-6 py-10">
//       <div className="w-full max-w-7xl mx-auto rounded-2xl shadow-lg overflow-hidden">
        
//         {/* Header */}
//         <div className="bg-blue-600 p-6 text-center">
//           <h2 className="text-2xl font-bold text-white">Repair & Maintenance Services</h2>
//         </div>

//         {/* Controls */}
//         <div className="flex justify-between mb-6 px-4">
//           <button
//             onClick={prevService}
//             className="bg-blue-100 text-blue-600 rounded-full p-2 hover:bg-blue-200 transition-colors"
//             aria-label="Previous service"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>

//           <button
//             onClick={nextService}
//             className="bg-blue-100 text-blue-600 rounded-full p-2 hover:bg-blue-200 transition-colors"
//             aria-label="Next service"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>

//         {/* Split Layout */}
//         <div className="flex flex-col md:flex-row">
          
//           {/* Left - Image */}
//           <div className="md:w-1/2 p-6 flex items-center justify-center">
//             <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl">
//               {services.map((service, index) => (
//                 <div
//                   key={index}
//                   className={`absolute inset-0 transition-opacity duration-500 ${
//                     index === currentIndex ? 'opacity-100' : 'opacity-0'
//                   }`}
//                 >
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-full object-cover rounded-xl"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
//                     <h3 className="text-xl font-bold">{service.title}</h3>
//                     <p className="text-sm">{service.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right - Details */}
//           <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200">
//             <div className="overflow-hidden">
//               <div
//                 className="flex transition-transform duration-300 ease-in-out"
//                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//               >
//                 {services.map((service, index) => (
//                   <div key={index} className="flex-shrink-0 w-full pr-4">
//                     <div className="text-center mb-4">
//                       <span className="text-5xl">{service.icon}</span>
//                     </div>
//                     <h3 className="text-2xl font-semibold text-blue-700 text-center mb-4">
//                       {service.title}
//                     </h3>
//                     <p className="text-gray-600 text-center mb-6">
//                       {service.description}
//                     </p>
//                     <div className="text-center text-blue-600 font-bold text-xl mb-8">
//                       Starting at {service.price}
//                     </div>
//                     <div className="mb-6">
//                       <h4 className="font-medium text-gray-800 mb-2">Service includes:</h4>
//                       <ul className="text-sm text-gray-600 space-y-1">
//                         <li className="flex items-center">
//                           <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Licensed and insured professionals
//                         </li>
//                         <li className="flex items-center">
//                           <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Quality parts and materials
//                         </li>
//                         <li className="flex items-center">
//                           <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Warranty on all repairs
//                         </li>
//                       </ul>
//                     </div>
//                     <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
//                       Schedule Repair
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Indicators */}
//         <div className="flex justify-center py-4 border-t border-gray-200 bg-gray-50">
//           <div className="flex space-x-3">
//             {services.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToService(index)}
//                 className={`h-4 w-4 rounded-full transition-all duration-300 ${
//                   index === currentIndex 
//                     ? 'bg-blue-600 scale-125' 
//                     : 'bg-blue-200 hover:bg-blue-300'
//                 }`}
//                 aria-label={`Go to ${services[index].title}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RepairMaintenanceCarousel;



'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const RepairMaintenanceCarousel = () => {
  const services = [
    {
      title: 'Plumbing Repairs',
      description: 'Fix leaks, clogs, and other plumbing issues with expert technicians',
      icon: '🔧',
      price: '$80-200',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'plumber',   // 👈 add path slug
    },
    {
      title: 'Electrical Fixes',
      description: 'Professional electrical repairs and installations for your home',
      icon: '⚡',
      price: '$100-250',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'electrician',
    },
    {
      title: 'Appliance Repair',
      description: 'Expert repair for all major home appliances',
      icon: '🏠',
      price: '$90-180',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'appliance-repair',
    },
    {
      title: 'Furniture Assembly',
      description: 'Professional assembly for all types of furniture',
      icon: '🪑',
      price: '$60-150',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'furniture-assembly',
    },
    {
      title: 'Door & Lock Repair',
      description: 'Fix doors, locks, and hardware issues',
      icon: '🚪',
      price: '$70-160',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'door-lock-repair',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextService = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevService = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  const goToService = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full min-h-screen bg-white px-6 py-10">
      <div className="w-full max-w-7xl mx-auto rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Repair & Maintenance Services</h2>
        </div>

        {/* Controls */}
        <div className="flex justify-between mb-6 px-4">
          <button
            onClick={prevService}
            className="bg-blue-100 text-blue-600 rounded-full p-2 hover:bg-blue-200 transition-colors"
            aria-label="Previous service"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextService}
            className="bg-blue-100 text-blue-600 rounded-full p-2 hover:bg-blue-200 transition-colors"
            aria-label="Next service"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Split Layout */}
        <div className="flex flex-col md:flex-row">
          
          {/* Left - Image */}
          <div className="md:w-1/2 p-6 flex items-center justify-center">
            <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {services.map((service, index) => (
                  <div key={index} className="flex-shrink-0 w-full pr-4">
                    <div className="text-center mb-4">
                      <span className="text-5xl">{service.icon}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-blue-700 text-center mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      {service.description}
                    </p>
                    <div className="text-center text-blue-600 font-bold text-xl mb-8">
                      Starting at {service.price}
                    </div>
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Service includes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Licensed and insured professionals
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Quality parts and materials
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Warranty on all repairs
                        </li>
                      </ul>
                    </div>

                    {/* Button with link */}
                    <Link href={`/services/${service.path}`}>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer">
                        Schedule Repair
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToService(index)}
                className={`h-4 w-4 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-blue-200 hover:bg-blue-300'
                }`}
                aria-label={`Go to ${services[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairMaintenanceCarousel;
