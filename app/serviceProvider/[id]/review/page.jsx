"use client";

import { useState } from "react";
import { Star, Filter } from "lucide-react";

export default function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  
  const reviews = [
    {
      id: 1,
      client: "Sarah Johnson",
      rating: 5,
      date: "2023-10-20",
      service: "Kitchen Sink Installation",
      comment: "John did an excellent job installing our new kitchen sink. He was professional, punctual, and the work was flawless. Highly recommended!",
      response: "Thank you Sarah! It was a pleasure working with you."
    },
    {
      id: 2,
      client: "Mike Wilson",
      rating: 4,
      date: "2023-10-18",
      service: "Bathroom Leak Repair",
      comment: "Quick response and fixed the leak efficiently. Would have given 5 stars if the cleanup was better.",
      response: null
    },
    {
      id: 3,
      client: "Emily Chen",
      rating: 5,
      date: "2023-10-15",
      service: "Water Heater Installation",
      comment: "Outstanding service! John explained everything clearly and completed the job ahead of schedule. Very professional.",
      response: "Thank you Emily! Glad I could help."
    },
    {
      id: 4,
      client: "Robert Brown",
      rating: 5,
      date: "2023-10-12",
      service: "Drain Cleaning",
      comment: "Fast and efficient service. Reasonable pricing and great communication throughout.",
      response: "Appreciate the kind words Robert!"
    }
  ];

  const stats = {
    averageRating: 4.8,
    totalReviews: 127,
    ratingDistribution: {
      5: 89,
      4: 25,
      3: 8,
      2: 3,
      1: 2
    }
  };

  const filteredReviews = reviews.filter(review => 
    filter === "all" || review.rating === parseInt(filter)
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
        <p className="text-gray-600 mt-2">What your clients are saying about your services</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            {/* Average Rating */}
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900">{stats.averageRating}</div>
              <div className="flex justify-center mt-2">
                {renderStars(Math.round(stats.averageRating))}
              </div>
              <p className="text-gray-600 mt-1">{stats.totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <div className="flex items-center w-16">
                    <span className="text-sm text-gray-600 mr-2">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${(stats.ratingDistribution[rating] / stats.totalReviews) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 ml-2 w-8">
                    {stats.ratingDistribution[rating]}
                  </span>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div className="mt-6">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Rating
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {review.client.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.client}</h3>
                      <p className="text-sm text-gray-500">{review.service}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>

                {review.response && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Your Response</p>
                    <p className="text-gray-700 mt-1">{review.response}</p>
                  </div>
                )}

                {!review.response && (
                  <div className="mt-4">
                    <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                      Respond to Review
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No reviews found</div>
              <p className="text-gray-500 mt-2">Try changing your filter settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}