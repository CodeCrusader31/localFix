// 'use client';
// import React, { useState } from 'react';

// const HomeServicesCarousel = () => {
//   const services = [
//     {
//       title: 'Deep Cleaning',
//       description: 'Thorough cleaning of every corner including sanitization of bathrooms and kitchens',
//       icon: '🧹',
//       price: '$120-200',
//       image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
//     },
//     {
//       title: 'Move-In/Move-Out Cleaning',
//       description: 'Complete cleaning service for moving situations',
//       icon: '🚚',
//       price: '$150-250',
//       image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
//     },
//     {
//       title: 'Carpet Cleaning',
//       description: 'Professional deep carpet cleaning and stain removal',
//       icon: '🧽',
//       price: '$80-150',
//       image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
//     },
//     {
//       title: 'Office Cleaning',
//       description: 'Commercial cleaning services for offices and workspaces',
//       icon: '🏢',
//       price: '$100-300',
//       image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
//     },
//     {
//       title: 'Post-Construction Cleaning',
//       description: 'Cleanup after construction or renovation projects',
//       icon: '🏗️',
//       price: '$200-400',
//       image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
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
//         <div className="bg-indigo-600 p-6 text-center">
//           <h2 className="text-2xl font-bold text-white">Home Cleaning Services</h2>
//         </div>

//         {/* Controls */}
//         <div className="flex justify-between mb-6 px-4">
//           <button
//             onClick={prevService}
//             className="bg-indigo-100 text-indigo-600 rounded-full p-2 hover:bg-indigo-200 transition-colors"
//             aria-label="Previous service"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>

//           <button
//             onClick={nextService}
//             className="bg-indigo-100 text-indigo-600 rounded-full p-2 hover:bg-indigo-200 transition-colors"
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
//                     <h3 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
//                       {service.title}
//                     </h3>
//                     <p className="text-gray-600 text-center mb-6">
//                       {service.description}
//                     </p>
//                     <div className="text-center text-indigo-600 font-bold text-xl mb-8">
//                       Starting at {service.price}
//                     </div>
//                     <div className="mb-6">
//                       <h4 className="font-medium text-gray-800 mb-2">Service includes:</h4>
//                       <ul className="text-sm text-gray-600 space-y-1">
//                         <li className="flex items-center">
//                           <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Professional equipment and supplies
//                         </li>
//                         <li className="flex items-center">
//                           <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Trained and vetted professionals
//                         </li>
//                         <li className="flex items-center">
//                           <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Satisfaction guarantee
//                         </li>
//                       </ul>
//                     </div>
//                     <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
//                       Book This Service
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
//                     ? 'bg-indigo-600 scale-125' 
//                     : 'bg-indigo-200 hover:bg-indigo-300'
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

// export default HomeServicesCarousel;


'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const HomeServicesCarousel = () => {
  const services = [
    {
      title: 'Deep Cleaning',
      description: 'Thorough cleaning of every corner including sanitization of bathrooms and kitchens',
      icon: '🧹',
      price: '$120-200',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'deep-cleaning',
    },
    {
      title: 'Move-In/Move-Out Cleaning',
      description: 'Complete cleaning service for moving situations',
      icon: '🚚',
      price: '$150-250',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'move-in-move-out-cleaning',
    },
    {
      title: 'Carpet Cleaning',
      description: 'Professional deep carpet cleaning and stain removal',
      icon: '🧽',
      price: '$80-150',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'carpet-cleaning',
    },
    {
      title: 'Office Cleaning',
      description: 'Commercial cleaning services for offices and workspaces',
      icon: '🏢',
      price: '$100-300',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'office-cleaning',
    },
    {
      title: 'Post-Construction Cleaning',
      description: 'Cleanup after construction or renovation projects',
      icon: '🏗️',
      price: '$200-400',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      path: 'post-construction-cleaning',
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
        <div className="bg-indigo-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Home Cleaning Services</h2>
        </div>

        {/* Controls */}
        <div className="flex justify-between mb-6 px-4">
          <button
            onClick={prevService}
            className="bg-indigo-100 text-indigo-600 rounded-full p-2 hover:bg-indigo-200 transition-colors"
            aria-label="Previous service"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextService}
            className="bg-indigo-100 text-indigo-600 rounded-full p-2 hover:bg-indigo-200 transition-colors"
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
                    <h3 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      {service.description}
                    </p>
                    <div className="text-center text-indigo-600 font-bold text-xl mb-8">
                      Starting at {service.price}
                    </div>
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Service includes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Professional equipment and supplies
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Trained and vetted professionals
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Satisfaction guarantee
                        </li>
                      </ul>
                    </div>

                    {/* Button with Link */}
                    <Link href={`/services/${service.path}`}>
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
                        Book This Service
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
                    ? 'bg-indigo-600 scale-125' 
                    : 'bg-indigo-200 hover:bg-indigo-300'
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

export default HomeServicesCarousel;
