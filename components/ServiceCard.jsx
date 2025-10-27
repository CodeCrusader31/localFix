// import Link from "next/link";

// export default function ServiceCard({ provider }) {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-4 hower:shadow-lg transition">
//       <h2 className="text-lg font-semibold">{provider.fullName}</h2>
//       <p className="text-gray-600">{provider.serviceCategory}</p>
//       <p>{provider.experience} years experience</p>
//       <p className="text-green-600">
//         {provider.availability ? "Available" : "Not Available"}
//       </p>
//       <Link href={`/providers/${provider._id}`}>
//         <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
//           View Details
//         </button>
//       </Link>
//     </div>
//   );
// }
"use client";
import React from "react";
import Link from "next/link";

export default function ServiceCard({ provider }) {
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const divRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative w-80 h-96 rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer"
    >
      {visible && (
        <div
          className="pointer-events-none blur-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 size-60 absolute z-0 transition-opacity duration-300"
          style={{ top: position.y - 120, left: position.x - 120 }}
        />
      )}

      <div className="relative z-10 bg-white p-6 h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center">
        {/* Avatar (replace with provider.image if available) */}
        <img
          src={provider.image || "https://via.placeholder.com/150"}
          alt={provider.fullName}
          className="w-24 h-24 rounded-full shadow-md my-4 object-cover"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {provider.fullName}
        </h2>

        {/* Service category */}
        <p className="text-sm text-indigo-500 font-medium mb-2">
          {provider.serviceCategory}
        </p>

        {/* Experience */}
        <p className="text-sm text-gray-500 mb-2">
          {provider.experience} years experience
        </p>

        {/* Availability */}
        <p
          className={`text-sm font-semibold mb-4 ${
            provider.availability ? "text-green-600" : "text-red-500"
          }`}
        >
          {provider.availability ? "Available" : "Not Available"}
        </p>

        {/* Button → provider profile */}
        <Link
          href={`/services/${provider.serviceCategory}/${provider._id}`}
          className="w-full"
        >
          <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
