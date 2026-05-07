"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Check, Clock, Mail, MapPin, Phone, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";

const FILTERS = [
  { id: "all", name: "All Requests" },
  { id: "PENDING", name: "Pending" },
  { id: "ACCEPTED", name: "Accepted" },
  { id: "IN_PROGRESS", name: "In Progress" },
  { id: "COMPLETED", name: "Completed" },
  { id: "REJECTED", name: "Rejected" },
];

function formatDate(value) {
  if (!value) return "Not scheduled";
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
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

export default function RequestsPage() {
  const { id } = useParams();
  const { user, loading: ctxLoading, socket } = useAppContext();
  const [filter, setFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const isAuthedProvider =
    !!user && user.role === "serviceProvider" && String(user.id) === String(id);

  const counts = useMemo(() => {
    return FILTERS.reduce((acc, item) => {
      acc[item.id] =
        item.id === "all"
          ? bookings.length
          : bookings.filter((booking) => booking.status === item.id).length;
      return acc;
    }, {});
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => filter === "all" || booking.status === filter);
  }, [bookings, filter]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!isAuthedProvider) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/bookings/provider/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch requests");
        }

        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message || "Failed to fetch requests");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (!ctxLoading) fetchBookings();
  }, [ctxLoading, id, isAuthedProvider]);

  useEffect(() => {
    if (!socket || !isAuthedProvider) return;

    const handleNewBooking = ({ booking }) => {
      if (!booking?._id) return;

      setBookings((current) => {
        if (current.some((item) => item._id === booking._id)) return current;
        return [booking, ...current];
      });
      toast.success("New booking request received");
    };
    const handleStatusUpdate = ({ bookingId, status, booking }) => {
      setBookings((current) =>
        current.map((item) =>
          item._id === bookingId ? { ...item, ...(booking || {}), status } : item
        )
      );
    };

    socket.on("newBooking", handleNewBooking);
    socket.on("bookingStatusUpdate", handleStatusUpdate);

    return () => {
      socket.off("newBooking", handleNewBooking);
      socket.off("bookingStatusUpdate", handleStatusUpdate);
    };
  }, [socket, isAuthedProvider]);

  const updateStatus = async (booking, status) => {
    setUpdatingId(booking._id);

    try {
      const res = await fetch(`/api/bookings/${booking._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to update booking");
      }

      const updatedBooking = data.booking;
      setBookings((current) =>
        current.map((item) => (item._id === updatedBooking._id ? updatedBooking : item))
      );

      socket?.emit("bookingStatusUpdate", {
        receiverId: updatedBooking.seekerId?._id || booking.seekerId?._id || booking.seekerId,
        bookingId: updatedBooking._id,
        status: updatedBooking.status,
        booking: updatedBooking,
      });

      toast.success(`Booking ${status.toLowerCase().replace("_", " ")}`);
    } catch (err) {
      toast.error(err.message || "Failed to update booking");
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Service Requests</h1>
        <p className="text-gray-600 mt-2">Manage incoming service bookings from clients</p>
      </div>

      {!isAuthedProvider ? (
        <div className="bg-white border border-red-100 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Access denied</h2>
          <p className="mt-2 text-gray-600">Log in as this service provider to manage requests.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 border-b border-gray-200 overflow-x-auto">
            <nav className="-mb-px flex gap-8 min-w-max">
              {FILTERS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    filter === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {counts[tab.id] || 0}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {error ? (
            <div className="bg-white border border-red-100 rounded-lg p-6 text-center text-red-700">
              {error}
            </div>
          ) : loading ? (
            <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 bg-white border border-gray-100 rounded-lg">
              <div className="text-gray-500 text-lg">No requests found</div>
              <p className="text-gray-500 mt-2">New bookings will appear here automatically.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.serviceType}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {booking.description || "No description provided."}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{formatDate(booking.scheduledAt)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>Requested {formatDate(booking.createdAt)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            {[booking.seekerId?.address, booking.seekerId?.city, booking.seekerId?.state]
                              .filter(Boolean)
                              .join(", ") || "Location not provided"}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{booking.seekerId?.phone || "Phone not provided"}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 md:col-span-2">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            Client: {booking.seekerId?.fullName || "Customer"}
                            {booking.seekerId?.email ? ` (${booking.seekerId.email})` : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-44 flex flex-col gap-2">
                      {booking.status === "PENDING" ? (
                        <>
                          <button
                            onClick={() => updateStatus(booking, "ACCEPTED")}
                            disabled={updatingId === booking._id}
                            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Accept
                          </button>
                          <button
                            onClick={() => updateStatus(booking, "REJECTED")}
                            disabled={updatingId === booking._id}
                            className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Decline
                          </button>
                        </>
                      ) : booking.status === "ACCEPTED" ? (
                        <button
                          onClick={() => updateStatus(booking, "IN_PROGRESS")}
                          disabled={updatingId === booking._id}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                        >
                          Start Work
                        </button>
                      ) : booking.status === "IN_PROGRESS" ? (
                        <button
                          onClick={() => updateStatus(booking, "COMPLETED")}
                          disabled={updatingId === booking._id}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
                        >
                          Mark Complete
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
