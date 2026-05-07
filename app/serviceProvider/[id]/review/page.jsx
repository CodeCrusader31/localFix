"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Filter, Star } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
    />
  ));
}

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function ReviewsPage() {
  const { id } = useParams();
  const { user, loading: ctxLoading } = useAppContext();
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isOwner = !!user && user.role === "serviceProvider" && String(user.id) === String(id);

  useEffect(() => {
    const loadReviews = async () => {
      if (!isOwner) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/ServiceProviders/${id}/reviews`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(payload.error || "Failed to load reviews");
        setData(payload);
      } catch (err) {
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    if (!ctxLoading) loadReviews();
  }, [ctxLoading, id, isOwner]);

  const filteredReviews = useMemo(() => {
    const reviews = data?.reviews || [];
    return reviews.filter((review) => filter === "all" || review.rating === Number(filter));
  }, [data, filter]);

  if (ctxLoading || loading) return <div className="bg-white rounded-lg p-6 shadow-sm">Loading reviews...</div>;

  if (!isOwner) {
    return (
      <div className="bg-white border border-red-100 rounded-lg p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Authentication required</h1>
        <p className="mt-2 text-gray-600">Log in as this service provider to view reviews.</p>
      </div>
    );
  }

  if (error) return <div className="bg-white border border-red-100 text-red-700 rounded-lg p-6">{error}</div>;

  const stats = data?.stats || { averageRating: 0, totalReviews: 0, ratingDistribution: {} };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
        <p className="text-gray-600 mt-2">What your clients are saying about your services.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900">{stats.averageRating || "0.0"}</div>
              <div className="flex justify-center mt-2">{renderStars(Math.round(stats.averageRating || 0))}</div>
              <p className="text-gray-600 mt-1">{stats.totalReviews || 0} reviews</p>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.ratingDistribution?.[rating] || 0;
                const percent = stats.totalReviews ? (count / stats.totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-16">
                      <span className="text-sm text-gray-600 mr-2">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="text-sm text-gray-600 ml-2 w-8">{count}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Rating
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Stars
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-6">
            {filteredReviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                No reviews found.
              </div>
            ) : (
              filteredReviews.map((review) => (
                <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {(review.customerId?.fullName || "Customer")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {review.customerId?.fullName || "Customer"}
                        </h3>
                        <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center">{renderStars(review.rating)}</div>
                    <p className="text-gray-700 mt-2">{review.comment || "No comment provided."}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
