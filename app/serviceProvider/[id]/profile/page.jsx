"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Camera, Mail, MapPin, Phone, RefreshCw, Save, Star } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function ProviderProfilePage() {
  const { id } = useParams();
  const { user, isAuthenticated, loading: contextLoading, fetchMe } = useAppContext();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isOwner =
    isAuthenticated && user?.role === "serviceProvider" && String(user.id) === String(id);

  const fetchProfile = async () => {
    if (!isOwner) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch(`/api/ServiceProviders/${id}/profile`, {
        credentials: "include",
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Failed to fetch profile");
      setProfile(data.user || data);
    } catch (err) {
      setError(err.message || "Failed to fetch profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!contextLoading) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextLoading, id, isOwner]);

  const handleSave = async () => {
    if (!profile) return;

    try {
      setSaving(true);
      setError("");
      const payload = {
        fullName: profile.fullName,
        phone: profile.phone,
        serviceCategory: profile.serviceCategory,
        skills: profile.skills,
        availability: profile.availability,
        serviceArea: profile.serviceArea,
        address: profile.address,
        pincode: profile.pincode,
        city: profile.city,
        district: profile.district,
        state: profile.state,
        country: profile.country,
        profilePic: profile.profilePic,
        experience: profile.experience,
      };

      const response = await fetch(`/api/ServiceProviders/${id}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Failed to update profile");

      setProfile(data.user || data);
      setIsEditing(false);
      await fetchMe();
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (skillsString) => {
    handleInputChange(
      "skills",
      skillsString
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    );
  };

  if (contextLoading || loading) {
    return <div className="bg-white rounded-lg p-6 shadow-sm">Loading profile...</div>;
  }

  if (!isOwner) {
    return (
      <div className="bg-white border border-red-100 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Authentication required</h2>
        <p className="text-gray-600 mt-2">Log in as this service provider to view your profile.</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="bg-white border border-red-100 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Error loading profile</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <button
          onClick={fetchProfile}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {error ? (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your provider information.</p>
        </div>
        <button
          onClick={fetchProfile}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          type="button"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mx-auto overflow-hidden">
                  {profile?.profilePic ? (
                    <img src={profile.profilePic} alt={profile.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-3xl">
                      {profile?.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "U"}
                    </span>
                  )}
                </div>
                <button
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200"
                  disabled={!isEditing}
                  title={isEditing ? "Update profile picture URL below" : "Enable editing to change photo"}
                  type="button"
                >
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">{profile?.fullName}</h2>
              <p className="text-gray-600 capitalize">{profile?.serviceCategory}</p>
              <div className="mt-2 flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{profile?.rating || "0.0"} rating</span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{[profile?.city, profile?.state].filter(Boolean).join(", ") || "Location not set"}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{profile?.phone || "Phone not set"}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{profile?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              <div className="flex gap-2">
                {isEditing ? (
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      fetchProfile();
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    type="button"
                  >
                    Cancel
                  </button>
                ) : null}
                <button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  disabled={saving}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  type="button"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["fullName", "Full Name", "text"],
                ["serviceCategory", "Service Category", "text"],
                ["phone", "Phone", "tel"],
                ["experience", "Experience (Years)", "number"],
                ["serviceArea", "Service Area", "text"],
                ["address", "Address", "text"],
                ["city", "City", "text"],
                ["state", "State", "text"],
                ["pincode", "Pincode", "text"],
                ["profilePic", "Profile Picture URL / Path", "text"],
              ].map(([field, label, type]) => (
                <div key={field} className={field === "address" || field === "profilePic" ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type={type}
                    value={profile?.[field] || ""}
                    onChange={(e) =>
                      handleInputChange(field, type === "number" ? Number(e.target.value) : e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  value={profile?.skills ? profile.skills.join(", ") : ""}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter skills separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={profile?.availability || false}
                    onChange={(e) => handleInputChange("availability", e.target.checked)}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Available for work</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
