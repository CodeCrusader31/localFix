

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import ChatBox from "@/components/ChatBox";

export default function ProviderProfilePage() {
  const { category, id } = useParams();
  const { user } = useAppContext();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [showChat, setShowChat] = useState(false); // ✅ toggle chat

  // Mock feedback data - replace with actual API call
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      customerName: "Rahul Sharma",
      rating: 5,
      comment: "Excellent service! Very professional and punctual.",
      date: "2024-01-15",
      service: "Plumbing Repair",
    },
    {
      id: 2,
      customerName: "Priya Patel",
      rating: 4,
      comment: "Good work, but slightly delayed. Would recommend.",
      date: "2024-01-10",
      service: "Electrical Work",
    },
    {
      id: 3,
      customerName: "Amit Kumar",
      rating: 5,
      comment: "Outstanding quality and very reasonable pricing.",
      date: "2024-01-05",
      service: "Carpentry",
    },
  ]);

  useEffect(() => {
    if (id) {
      fetch(`/api/ServiceProviders/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error(`API Error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setProvider(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch Provider Error:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const roomId = user?.id && provider?._id 
  ? `${user.id}-${provider._id}` 
  : null;


  if (loading) return <div>Loading...</div>;
  if (!provider) return <div>Provider Not Found</div>;
  // Default profile picture with fade blue effect
  const DefaultAvatar = () => (
    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center shadow-lg border-4 border-white">
      <span className="text-6xl text-white font-bold">
        {provider?.fullName?.charAt(0).toUpperCase() || "U"}
      </span>
    </div>
  );

  // Format address
  const getFullAddress = () => {
    if (!provider) return "";

    const addressParts = [
      provider.address,
      provider.city,
      provider.district,
      provider.state,
      provider.pincode,
      provider.country,
    ].filter((part) => part && part.trim() !== "");

    return addressParts.join(", ");
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-gray-600">({rating}.0)</span>
      </div>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-blue-200 rounded w-1/3 mb-8"></div>
            <div className="flex gap-8">
              <div className="w-48 h-48 bg-blue-200 rounded-full"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 bg-blue-200 rounded w-1/2"></div>
                <div className="h-4 bg-blue-200 rounded w-1/3"></div>
                <div className="h-4 bg-blue-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (!provider)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Provider Not Found
          </h2>
          <p className="text-gray-600">
            The service provider you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Side - Profile Picture with Fade Blue */}
          <div className="flex-shrink-0">
            {provider.profilePic ? (
              <div className="relative">
                <img
                  src={provider.profilePic}
                  alt={provider.fullName}
                  className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-white"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 opacity-20"></div>
              </div>
            ) : (
              <DefaultAvatar />
            )}

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <div className="text-center space-y-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {provider.experience}+
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {feedbacks.length}
                  </div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
                <div>
                  <div
                    className={`text-lg font-bold ${
                      provider.availability ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {provider.availability ? "Available" : "Busy"}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - All Information */}
          <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
            {/* Name and Basic Info */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {provider.fullName}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {provider.serviceCategory}
                </span>
                <div className="flex items-center gap-2">
                  <StarRating rating={provider.rating || 0} />
                </div>
              </div>
            </div>
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b border-blue-100 pb-2">
                  Contact Details
                </h3>

                {provider.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <span className="text-blue-500 text-lg">📞</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-800">
                        {provider.phone}
                      </p>
                    </div>
                  </div>
                )}

                {provider.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <span className="text-blue-500 text-lg">✉️</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-800 break-all">
                        {provider.email}
                      </p>
                    </div>
                  </div>
                )}

                {provider.serviceArea && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <span className="text-blue-500 text-lg">🗺️</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Service Area</p>
                      <p className="font-medium text-gray-800">
                        {provider.serviceArea}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Address & Verification */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b border-blue-100 pb-2">
                  Location & Verification
                </h3>

                {getFullAddress() && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-500 text-lg">📍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-800 leading-relaxed">
                        {getFullAddress()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 text-lg">🆔</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ID Verification</p>
                    <p
                      className={`font-medium ${
                        provider.idProof ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {provider.idProof ? "Verified" : "Pending Verification"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Skills Section */}
            {provider.skills && provider.skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {provider.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-blue-100">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl">
                <span className="text-lg">📞</span>
                Contact Now
              </button>
              <button
               onClick={() => {
  console.log("Logged-in user:", user?.id);
  console.log("Provider:", provider?.id);
  console.log("Room ID:", roomId);
  setShowChat(!showChat);
}}

                className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-3 rounded-xl"
              >
                💬 {showChat ? "Close Chat" : "Send Message"}
              </button>
              <button className="border border-green-500 text-green-500 hover:bg-green-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3">
                <span className="text-lg">⭐</span>
                Leave Feedback
              </button>
            </div>
            
            {showChat && user && provider?._id && roomId && (
  <div className="mt-8">
    <ChatBox 
      roomId={roomId} 
      receiverId={provider._id} 
      senderId={user.id} 
    />
  </div>
)}

          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Customer Feedback
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-700">
                Overall Rating:{" "}
                <span className="text-blue-600">
                  {provider.rating || "N/A"}
                </span>
              </span>
            </div>
          </div>

          {feedbacks.length > 0 ? (
            <div className="space-y-6">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="border border-blue-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {feedback.customerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {feedback.customerName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feedback.service}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(feedback.date).toLocaleDateString()}
                    </div>
                  </div>

                  <StarRating rating={feedback.rating} />

                  <p className="text-gray-700 mt-3 leading-relaxed">
                    {feedback.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Feedback Yet
              </h3>
              <p className="text-gray-600">
                Be the first to leave feedback for this provider!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
