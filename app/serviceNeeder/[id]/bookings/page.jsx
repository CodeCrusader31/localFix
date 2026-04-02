"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/footer";

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(value);
  }
}

function statusClasses(status) {
  switch (status) {
    case "PENDING":
      return "bg-gray-100 text-gray-800";
    case "ACCEPTED":
      return "bg-blue-100 text-blue-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-800";
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function MyBookingsPage() {
  const { id } = useParams(); // seekerId
  const { user, loading: ctxLoading } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const seekerId = useMemo(() => id, [id]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!seekerId || !user) return;
      if (user.role !== "serviceNeeder") return;

      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/bookings/seeker/${seekerId}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message || "Failed to fetch bookings");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (!ctxLoading) fetchBookings();
  }, [ctxLoading, seekerId, user]);

  const isAuthed = !!user && user.role === "serviceNeeder";

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="bg-white/70 backdrop-blur rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-200 opacity-40 blur-sm" />
            <div className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full bg-indigo-200 opacity-40 blur-sm" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-sm font-medium">
                <span aria-hidden="true">📅</span>
                Your bookings
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                My Bookings
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-3xl leading-relaxed">
                View your upcoming services, status updates, and provider details
                in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isAuthed ? (
            <div className="bg-white border border-indigo-100 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Authentication required</h2>
              <p className="mt-2 text-gray-600">Please log in as a service neeeder to view your bookings.</p>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-100 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Could not load bookings</h2>
              <p className="mt-2 text-gray-600">{error}</p>
            </div>
          ) : loading ? (
            <div className="bg-white border border-indigo-100 rounded-2xl p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-full" />
                <div className="h-5 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white border border-indigo-100 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🗓️</div>
              <h2 className="text-2xl font-bold text-gray-900">No bookings yet</h2>
              <p className="mt-2 text-gray-600">
                Book a service to see it here.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <article
                  key={booking._id}
                  className="bg-white border border-indigo-100 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-start gap-4 justify-between">
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {booking.serviceType}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Provider:{" "}
                        <span className="font-medium text-gray-900">
                          {booking.providerId?.fullName || booking.providerId?._id || "Unknown"}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-gray-600">
                      <div>
                        <span className="font-medium text-gray-900">When:</span>{" "}
                        {formatDate(booking.scheduledAt)}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {booking.providerId?._id && (
                        <Link
                          href={`/serviceProvider/${booking.providerId._id}/profile`}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-indigo-200 text-indigo-700 font-medium hover:bg-indigo-50 transition-colors text-sm"
                        >
                          View Provider
                        </Link>
                      )}
                    </div>
                  </div>

                  {booking.description ? (
                    <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                      {booking.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

