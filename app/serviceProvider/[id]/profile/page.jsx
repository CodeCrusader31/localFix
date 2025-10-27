// app/serviceProvider/[id]/profile/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function ProfilePage() {
  const { id: urlId } = useParams();
  const router = useRouter();
  const { user, loading } = useAppContext();
  const [form, setForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Redirect if URL id != logged-in id
  useEffect(() => {
    if (!loading && user && urlId !== user.id) {
      router.replace(`/serviceProviders/${user.id}/profile`);
    }
  }, [loading, user, urlId, router]);

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/me", {
          cache: "no-store",
          credentials: "include",
        });
        if (res.ok) {
          const profileData = await res.json();
          setForm(profileData);
        } else {
          console.error("Failed to fetch profile:", res.status);
          setForm({});
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setForm({});
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(",").map(skill => skill.trim()).filter(Boolean);
    setForm(prev => ({ ...prev, skills: skillsArray }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    
    try {
      const res = await fetch("/api/serviceProviders/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        const error = await res.json();
        alert(`Update failed: ${error.message || "Please try again"}`);
      }
    } catch (error) {
      alert("Update failed. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  const onCancel = () => {
    // Reload original data
    fetch("/api/me", {
      cache: "no-store",
      credentials: "include",
    })
      .then(res => res.ok && res.json())
      .then(data => {
        setForm(data);
        setIsEditing(false);
      });
  };

  if (loading || !form) return <div className="flex justify-center items-center min-h-64"><p>Loading...</p></div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 px-6 py-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{form.fullName || "Service Provider"}</h1>
              <p className="text-blue-100 mt-2 text-lg">{form.serviceCategory || "No category specified"}</p>
              <div className="flex items-center mt-4 space-x-4">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  form.availability 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {form.availability ? "Available for Work" : "Not Available"}
                </span>
                {form.rating && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ {form.rating}/5
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="profile-form"
                    disabled={saveLoading}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {saveLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form id="profile-form" onSubmit={onSubmit} className="p-8">
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName || ""}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg">{form.fullName || "Not provided"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <p className="text-gray-900 text-lg">{form.email || "Not provided"}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone || ""}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg">{form.phone || "Not provided"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  {isEditing ? (
                    <select
                      name="availability"
                      value={form.availability ? "true" : "false"}
                      onChange={(e) => setForm({ ...form, availability: e.target.value === "true" })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 text-lg">{form.availability ? "Available" : "Not Available"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Category
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="serviceCategory"
                      value={form.serviceCategory || ""}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg">{form.serviceCategory || "Not provided"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hourly Rate
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="hourlyRate"
                      value={form.hourlyRate || ""}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg">
                      {form.hourlyRate ? `$${form.hourlyRate}/hour` : "Not specified"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="experience"
                      value={form.experience || ""}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg">
                      {form.experience ? `${form.experience} years` : "Not specified"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Response Time
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="responseTime"
                      value={form.responseTime || ""}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg">{form.responseTime || "Not specified"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Skills
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={Array.isArray(form.skills) ? form.skills.join(", ") : form.skills || ""}
                      onChange={handleSkillsChange}
                      placeholder="Enter skills separated by commas"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">Separate multiple skills with commas</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(form.skills) && form.skills.length > 0 ? (
                      form.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-900 text-lg">No skills listed</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Jobs Completed
                  </label>
                  <p className="text-gray-900 text-lg">{form.totalJobs || 0}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Member Since
                  </label>
                  <p className="text-gray-900 text-lg">
                    {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Updated
                  </label>
                  <p className="text-gray-900 text-lg">
                    {form.updatedAt ? new Date(form.updatedAt).toLocaleDateString() : "Never"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Quick Action Footer */}
        {!isEditing && (
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Ready to update your profile? Click Edit Profile to make changes.
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}