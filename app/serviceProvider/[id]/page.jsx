// // // app/serviceProvider/[id]/page.js
// // export default function DashboardPage() {
// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

// //       {/* Summary cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {/* Active Jobs */}
// //         <div className="p-6 bg-white shadow rounded-lg">
// //           <h2 className="text-lg font-semibold text-gray-800">Active Jobs</h2>
// //           <p className="text-gray-600 mt-2">You have 3 ongoing jobs</p>
// //         </div>

// //         {/* Earnings */}
// //         <div className="p-6 bg-white shadow rounded-lg">
// //           <h2 className="text-lg font-semibold text-gray-800">Earnings</h2>
// //           <p className="text-gray-600 mt-2">₹12,000 this month</p>
// //         </div>

// //         {/* Reviews */}
// //         <div className="p-6 bg-white shadow rounded-lg">
// //           <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
// //           <p className="text-gray-600 mt-2">⭐ 4.5 average rating</p>
// //         </div>
// //       </div>

// //       {/* Recent Requests */}
// //       <div className="mt-10">
// //         <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
// //         <div className="bg-white shadow rounded-lg p-6">
// //           <ul className="divide-y divide-gray-200">
// //             <li className="py-3">
// //               <p className="font-medium text-gray-800">Fix leaking pipe</p>
// //               <p className="text-sm text-gray-500">From: Rahul Sharma · Pending</p>
// //             </li>
// //             <li className="py-3">
// //               <p className="font-medium text-gray-800">Install ceiling fan</p>
// //               <p className="text-sm text-gray-500">From: Anita Verma · Accepted</p>
// //             </li>
// //             <li className="py-3">
// //               <p className="font-medium text-gray-800">Electrical wiring check</p>
// //               <p className="text-sm text-gray-500">From: Sunil Gupta · Completed</p>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import { Star, MapPin, Calendar, CheckCircle, MessageCircle } from "lucide-react";

// export default function ServiceProviderProfile({ params }) {
//   const { id } = params;
//   const [provider, setProvider] = useState({
//     id: id,
//     name: "John Doe",
//     profession: "Professional Plumber",
//     rating: 4.8,
//     reviews: 127,
//     location: "New York, NY",
//     memberSince: "2022",
//     completedJobs: 89,
//     responseTime: "1-2 hours",
//     description: "Professional plumber with 10+ years of experience. Specialized in residential plumbing, leak repairs, and installation services.",
//     services: ["Pipe Repair", "Leak Detection", "Fixture Installation", "Drain Cleaning"],
//     availability: "Available"
//   });

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* Profile Header */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
//           <div className="flex-shrink-0">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
//               <span className="text-white font-bold text-2xl">JD</span>
//             </div>
//           </div>
//           <div className="md:ml-6 flex-1">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
//                 <p className="text-lg text-gray-600">{provider.profession}</p>
//                 <div className="flex items-center mt-2 space-x-4">
//                   <div className="flex items-center">
//                     <Star className="h-5 w-5 text-yellow-400 fill-current" />
//                     <span className="ml-1 font-medium">{provider.rating}</span>
//                     <span className="ml-1 text-gray-500">({provider.reviews} reviews)</span>
//                   </div>
//                   <div className="flex items-center text-gray-500">
//                     <MapPin className="h-4 w-4" />
//                     <span className="ml-1">{provider.location}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 md:mt-0">
//                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                   provider.availability === "Available" 
//                     ? "bg-green-100 text-green-800" 
//                     : "bg-red-100 text-red-800"
//                 }`}>
//                   {provider.availability}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
//           <div className="text-center">
//             <p className="text-2xl font-bold text-gray-900">{provider.completedJobs}</p>
//             <p className="text-sm text-gray-500">Jobs Completed</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-gray-900">{provider.responseTime}</p>
//             <p className="text-sm text-gray-500">Avg. Response Time</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-gray-900">{provider.memberSince}</p>
//             <p className="text-sm text-gray-500">Member Since</p>
//           </div>
//         </div>
//       </div>

//       {/* Services & Description */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
//           <p className="text-gray-600">{provider.description}</p>
          
//           <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Services Offered</h3>
//           <div className="flex flex-wrap gap-2">
//             {provider.services.map((service, index) => (
//               <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                 {service}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Contact & Booking</h2>
//           <div className="space-y-4">
//             <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
//               Book Service
//             </button>
//             <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
//               <MessageCircle className="h-5 w-5 mr-2" />
//               Send Message
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Star, MapPin, MessageCircle, Phone, Mail } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function ServiceProviderProfile() {
  const { user, isAuthenticated } = useAppContext();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("👤 User from context:", user);
console.log("✅ isAuthenticated:", isAuthenticated);


  // useEffect(() => {
  //   if (user?._id) fetchProviderProfile(user._id);
  // }, [user]);

  useEffect(() => {
  if (isAuthenticated && user?.id) {
    console.log("🟢 Triggering profile fetch for", user.id);
    fetchProviderProfile(user.id);
  }
}, [isAuthenticated, user]);


  const fetchProviderProfile = async (id) => {
    try {
      setLoading(true);
      setError("");
      console.log("🟢 Fetching provider profile for ID:", id);

      const response = await fetch(`/api/ServiceProviders/${id}/public`, {
        credentials: "include",
        cache: "no-store",
      });
      console.log("🟢 Response:", response);

      console.log("🟢 Profile response status:", response.status);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Service provider not found");
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch profile: ${response.status}`);
      }

      // const data = await response.json();
      // console.log("🟢 Provider data received:", data);
      // setProvider(data);
      const data = await response.json();
console.log("🟢 Provider data received:", data);
setProvider(data.provider || data);

    } catch (error) {
      console.error("🔴 Error fetching provider profile:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = () => alert("Booking service with " + provider?.fullName);
  const handleSendMessage = () => alert("Sending message to " + provider?.fullName);

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">Please log in to view your profile</h2>
      </div>
    );
  }

  if (loading)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p>Loading your profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Profile Not Found</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <button
          onClick={() => fetchProviderProfile(user._id)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );

  if (!provider)
    return (
      <div className="text-center mt-10">
        <p>Unable to load your profile.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* --- Profile Header --- */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              {provider.profilePic ? (
                <img
                  src={provider.profilePic}
                  alt={provider.fullName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-2xl">
                  {provider.fullName?.split(" ").map((n) => n[0]).join("")}
                </span>
              )}
            </div>
          </div>
          <div className="md:ml-6 flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{provider.fullName}</h1>
            <p className="text-lg text-gray-600 capitalize">{provider.serviceCategory}</p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center text-gray-500">
                <MapPin className="h-4 w-4" />
                <span className="ml-1">
                  {provider.city}, {provider.state}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Contact Info --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <span>{provider.phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            <span>{provider.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
