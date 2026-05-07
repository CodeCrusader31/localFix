"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Briefcase, IndianRupee, Star, ClipboardList } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function ProviderDashboardPage() {
  const { id } = useParams();
  const { user, loading: ctxLoading } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isOwner = !!user && user.role === "serviceProvider" && String(user.id) === String(id);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!isOwner) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/ServiceProviders/${id}/dashboard`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(payload.error || "Failed to load dashboard");
        setData(payload);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (!ctxLoading) loadDashboard();
  }, [ctxLoading, id, isOwner]);

  if (ctxLoading || loading) {
    return <div className="bg-white rounded-lg p-6 shadow-sm">Loading dashboard...</div>;
  }

  if (!isOwner) {
    return (
      <div className="bg-white border border-red-100 rounded-lg p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Authentication required</h1>
        <p className="mt-2 text-gray-600">Log in as this service provider to view the dashboard.</p>
      </div>
    );
  }

  if (error) {
    return <div className="bg-white border border-red-100 text-red-700 rounded-lg p-6">{error}</div>;
  }

  const stats = data?.stats || {};
  const cards = [
    { label: "Active Jobs", value: stats.activeJobs || 0, icon: Briefcase, color: "bg-blue-100 text-blue-700" },
    { label: "Pending Requests", value: stats.pendingRequests || 0, icon: ClipboardList, color: "bg-amber-100 text-amber-700" },
    { label: "Completed Jobs", value: stats.completedJobs || 0, icon: Briefcase, color: "bg-green-100 text-green-700" },
    { label: "Total Earnings", value: money(stats.totalEarnings), icon: IndianRupee, color: "bg-emerald-100 text-emerald-700" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {data?.provider?.fullName || "Provider"}
        </h1>
        <p className="text-gray-600 mt-2">Your live booking and service summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Requests</h2>
            <Link href={`/serviceProvider/${id}/request`} className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {(data?.recentBookings || []).length === 0 ? (
              <div className="p-6 text-gray-500">No booking requests yet.</div>
            ) : (
              data.recentBookings.map((booking) => (
                <div key={booking._id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-900">{booking.serviceType}</p>
                    <p className="text-sm text-gray-500">
                      {booking.seekerId?.fullName || "Customer"} - {formatDate(booking.scheduledAt)}
                    </p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                    {booking.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
          </div>
          <p className="mt-4 text-4xl font-bold text-gray-900">{stats.averageRating || "0.0"}</p>
          <p className="text-sm text-gray-500">{stats.totalReviews || 0} total reviews</p>
          <div className="mt-6 space-y-4">
            {(data?.recentReviews || []).length === 0 ? (
              <p className="text-gray-500 text-sm">No reviews yet.</p>
            ) : (
              data.recentReviews.map((review) => (
                <div key={review._id} className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-gray-900">
                    {review.customerId?.fullName || "Customer"} - {review.rating}/5
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{review.comment || "No comment"}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
