// "use client";

// import { useState } from "react";
// import { useRouter,useParams } from "next/navigation";

// export default function BookingPage({ params }) {
//   const router = useRouter();
//   const { id } = useParams();
//   const providerId = id;

//   const [formData, setFormData] = useState({
//     serviceType: "",
//     description: "",
//     scheduledAt: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//     //   const res = await fetch("/api/bookings/create", {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //       // Authorization header not needed if you test via Postman
//     //       // Add it here only if you manually inject token
//     //     },
//     //     body: JSON.stringify({
//     //       providerId,
//     //       serviceType: formData.serviceType,
//     //       description: formData.description,
//     //       scheduledAt: formData.scheduledAt,
//     //     }),
//      const token = document.cookie
//   .split("; ")
//   .find((row) => row.startsWith("token="))
//   ?.split("=")[1];

// const res = await fetch("/api/bookings/create", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({
//     providerId,
//     serviceType: formData.serviceType,
//     description: formData.description,
//     scheduledAt: formData.scheduledAt,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Booking failed");
//         setLoading(false);
//         return;
//       }

//       // success
//       router.push("/serviceNeeder/dashboard");
//     } catch (err) {
//       setError("Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded">
//       <h1 className="text-2xl font-bold mb-4">Book Service</h1>

//       {error && (
//         <p className="text-red-500 text-sm mb-3">{error}</p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm mb-1">Service Type</label>
//           <input
//             type="text"
//             name="serviceType"
//             required
//             value={formData.serviceType}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             placeholder="Plumbing, Electrical, etc."
//           />
//         </div>

//         <div>
//           <label className="block text-sm mb-1">Problem Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             placeholder="Describe the issue"
//           />
//         </div>

//         <div>
//           <label className="block text-sm mb-1">Schedule Date & Time</label>
//           <input
//             type="datetime-local"
//             name="scheduledAt"
//             required
//             value={formData.scheduledAt}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded"
//         >
//           {loading ? "Booking..." : "Confirm Booking"}
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function BookingPage() {
  const router = useRouter();
  const { id } = useParams(); // providerId from URL
  const providerId = id;
  const { socket, user } = useAppContext();

  const [formData, setFormData] = useState({
    serviceType: "",
    description: "",
    scheduledAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!user) {
        setError("Authentication required. Please login again.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProviderId: providerId,
          ServiceType: formData.serviceType,
          description: formData.description,
          scheduleAt: formData.scheduledAt,
        }),
      });


      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Booking failed");
        setLoading(false);
        return;
      }

      // Emit real-time notification to the provider
      if (socket) {
        socket.emit("sendBookingNotification", {
          receiverId: providerId,
          booking: data.booking || formData,
        });
      }

      // ✅ success
      router.push("/serviceNeeder/dashboard");
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Book Service</h1>

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Service Type</label>
          <input
            type="text"
            name="serviceType"
            required
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Plumbing, Electrical, etc."
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Problem Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Describe the issue"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Schedule Date & Time</label>
          <input
            type="datetime-local"
            name="scheduledAt"
            required
            value={formData.scheduledAt}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
