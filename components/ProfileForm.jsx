// "use client";
// import { useAppContext } from "@/context/AppContext";
// import { useState, useEffect } from "react";

// export default function ProfilePage() {
//   const { user, loading, isAuthenticated } = useAppContext();
//   const [form, setForm] = useState({});

//   useEffect(() => {
//     if (user) {
//       setForm(user); // pre-fill profile form
//     }
//   }, [user]);

//   if (loading) return <p>Loading...</p>;
//   if (!isAuthenticated) return <p>You must log in to view your profile.</p>;

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch(`/api/serviceProvider/${user._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     if (res.ok) {
//       alert("Profile updated successfully!");
//     } else {
//       alert("Error updating profile");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
//       <input
//         type="text"
//         name="fullName"
//         value={form.fullName || ""}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="email"
//         name="email"
//         value={form.email || ""}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="text"
//         name="phone"
//         value={form.phone || ""}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="text"
//         name="serviceCategory"
//         value={form.serviceCategory || ""}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//         Save Changes
//       </button>
//     </form>
//   );
// }
