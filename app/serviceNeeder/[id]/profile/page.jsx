"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Camera, Save, RefreshCw, MapPin, Phone, Mail } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/footer";

function joinParts(...parts) {
  return parts.filter((p) => p && String(p).trim()).join(", ");
}

export default function ServiceNeederProfilePage() {
  const { id } = useParams(); // seekerId
  const { user, loading: ctxLoading } = useAppContext();

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isAuthed = !!user && user.role === "serviceNeeder";

  const fetchProfile = async () => {
    if (!id || !user) return;
    if (!isAuthed) return;
    if (String(user.id) !== String(id)) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/ServiceNeeder/${id}/profile`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to load profile");
      }

      const data = await res.json();
      setProfile(data.user || null);
    } catch (err) {
      setError(err.message || "Failed to load profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ctxLoading) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctxLoading, id]);

  const handleSave = async () => {
    if (!profile || !id) return;
    setSaving(true);
    setError("");

    try {
      const payload = {
        fullName: profile.fullName,
        phone: profile.phone,
        address: profile.address,
        pincode: profile.pincode,
        city: profile.city,
        district: profile.district,
        state: profile.state,
        country: profile.country,
        profilePic: profile.profilePic,
      };

      const res = await fetch(`/api/ServiceNeeder/${id}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update profile");
      }

      const data = await res.json();
      setProfile(data.user || profile);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (ctxLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
            <div className="bg-white/70 backdrop-blur rounded-3xl p-8 sm:p-12">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-full" />
                <div className="h-64 bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-14">
          <div className="bg-white border border-indigo-100 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Authentication required</h2>
            <p className="mt-2 text-gray-600">Please log in as a service neeeder to view this profile.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="bg-white/70 backdrop-blur rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-200 opacity-40 blur-sm" />
            <div className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full bg-indigo-200 opacity-40 blur-sm" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-sm font-medium">
                    <span aria-hidden="true">👤</span>
                    Profile settings
                  </div>
                  <h1 className="mt-6 text-4xl font-bold text-gray-900 tracking-tight">
                    {profile?.fullName || "Your profile"}
                  </h1>
                  <p className="mt-3 text-lg text-gray-700">
                    Manage your details and service location.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsEditing((v) => !v);
                    setError("");
                  }}
                  className="hidden sm:inline-flex items-center px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                  disabled={!profile}
                >
                  {isEditing ? "Editing" : "Edit Profile"}
                </button>
              </div>

              {error ? (
                <div className="mt-6 bg-red-50 border border-red-100 text-red-800 rounded-xl p-4">
                  {error}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden">
                      {profile?.profilePic ? (
                        // profilePic is currently stored as a string; assume it is a usable URL/path
                        <img
                          src={profile.profilePic}
                          alt={profile?.fullName || "Profile"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-4xl">
                          {(profile?.fullName || "U")
                            .split(" ")
                            .filter(Boolean)
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <button
                      className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                      disabled={!isEditing}
                      title={isEditing ? "Update profilePic (URL/path)" : "Enable editing to change photo"}
                      type="button"
                    >
                      <Camera className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-gray-900">{profile?.fullName}</h2>
                  <div className="mt-2 flex items-center justify-center gap-2 text-gray-600 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{joinParts(profile?.city, profile?.state)}</span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{profile?.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{profile?.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
                <div className="flex items-center justify-between mb-6 gap-4">
                  <h2 className="text-xl font-bold text-gray-900">Your details</h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        fetchProfile();
                        setIsEditing(false);
                        setError("");
                      }}
                      className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 rounded-xl"
                      type="button"
                      disabled={!isEditing}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </button>

                    <button
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      disabled={!profile || saving}
                      className="inline-flex items-center px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                      type="button"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Saving..." : isEditing ? "Save Changes" : "Edit"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profile?.fullName || ""}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profile?.phone || ""}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={profile?.address || ""}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed min-h-[90px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      value={profile?.pincode || ""}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((p) => ({ ...p, pincode: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={profile?.city || ""}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                    <input
                      type="text"
                      value={profile?.district || ""}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((p) => ({ ...p, district: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={profile?.state || ""}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((p) => ({ ...p, state: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={profile?.country || ""}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Picture (URL / Path)
                    </label>
                    <input
                      type="text"
                      value={profile?.profilePic || ""}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, profilePic: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="e.g. https://... or /uploads/..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

