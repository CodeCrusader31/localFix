

// import connectDB from "@/lib/config/db";
// import User from "@/lib/models/User";
// import bcrypt from "bcrypt";

// export async function POST(req) {
//   try {
//     await connectDB();
//     const formData = await req.formData();

//     const role = formData.get("role");
//     const fullName = formData.get("fullName");
//     const username = formData.get("username");
//     const email = formData.get("email");
//     const phone = formData.get("phone");
//     const password = formData.get("password");

//     // Address parts
//     const address = formData.get("address");
//     const pincode = formData.get("pincode");
//     const city = formData.get("city");
//     const district = formData.get("district");
//     const state = formData.get("state");
//     const country = formData.get("country");

//     // Provider-specific
//     const serviceCategory = formData.get("serviceCategory");
//     const experience = formData.get("experience");
//     const serviceArea = formData.get("serviceArea");
//     const availability = formData.get("availability") === "true";

//     // ✅ Skills
//     const skills = [];
//     let skillIndex = 0;
//     while (formData.get(`skills[${skillIndex}]`)) {
//       skills.push(formData.get(`skills[${skillIndex}]`));
//       skillIndex++;
//     }

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 🌍 Geocode provider address
//     let location = null;
//     if (role === "serviceProvider") {
//       const fullAddress = `${address}, ${city}, ${state}, ${country}, ${pincode}`;
//       const geoRes = await fetch(
//         `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//           fullAddress
//         )}&key=${process.env.OPENCAGE_API_KEY}`
//       );
//       const geoData = await geoRes.json();
//       if (geoData.results.length > 0) {
//         const { lat, lng } = geoData.results[0].geometry;
//         location = { type: "Point", coordinates: [lng, lat] };
//       }
//     }

//     // ✅ Save User
//     const newUser = await User.create({
//       role,
//       fullName,
//       username,
//       email,
//       phone,
//       password: hashedPassword,
//       address,
//       pincode,
//       city,
//       district,
//       state,
//       country,
//       serviceCategory,
//       experience,
//       skills,
//       availability,
//       serviceArea,
//       location, // ✅ GeoJSON stored here
//     });

//     return new Response(
//       JSON.stringify({
//         message: "User registered successfully",
//         user: {
//           id: newUser._id,
//           username: newUser.username,
//           role: newUser.role,
//         },
//       }),
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("Signup Error:", err);
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }


import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json(); // ✅ Parse JSON request

    const {
      role,
      fullName,
      username,
      email,
      phone,
      password,
      address,
      pincode,
      city,
      district,
      state,
      country,
      serviceCategory,
      experience,
      serviceArea,
      availability,
      skills = []
    } = body;

    // ✅ Validation
    if (!role || !fullName || !username || !email || !phone || !password) {
      return new Response(
        JSON.stringify({ error: "Please fill all required fields" }),
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🌍 Geocode (for both serviceProvider + serviceNeeder)
    let location = null;
    if (address && city && state && country) {
      const fullAddress = `${address || ""}, ${city || ""}, ${state || ""}, ${country || ""}, ${pincode || ""}`;

      const geoRes = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          fullAddress
        )}&key=${process.env.OPENCAGE_API_KEY}`
      );

      const geoData = await geoRes.json();

      if (geoData.results.length > 0) {
        const { lat, lng } = geoData.results[0].geometry;
        location = { type: "Point", coordinates: [lng, lat] };
        console.log("✅ Geocoded:", location);
      } else {
        console.warn("⚠️ No geocoding results for address:", fullAddress);
      }
    }

    // ✅ Save User
    const newUser = await User.create({
      role,
      fullName,
      username,
      email,
      phone,
      password: hashedPassword,
      address,
      pincode,
      city,
      district,
      state,
      country,
      serviceCategory,
      experience,
      skills,
      availability,
      serviceArea,
      location, // ✅ Always saved if found
    });

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          role: newUser.role,
          location: newUser.location, // show in response for testing
        },
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}




// // app/api/auth/signup/route.js
// import connectDB from "@/lib/config/db";
// import User from "@/lib/models/User";
// import bcrypt from "bcrypt";

// export async function POST(req) {
//   try {
//     await connectDB();

//     // ✅ Parse FormData (instead of JSON)
//     const formData = await req.formData();

//     const role = formData.get("role");
//     const fullName = formData.get("fullName");
//     const username = formData.get("username");
//     const email = formData.get("email");
//     const phone = formData.get("phone");
//     const password = formData.get("password");

//     const address = formData.get("address");
//     const pincode = formData.get("pincode");
//     const city = formData.get("city");
//     const district = formData.get("district");
//     const state = formData.get("state");
//     const country = formData.get("country");

//     const serviceCategory = formData.get("serviceCategory");
//     const experience = formData.get("experience");
//     const serviceArea = formData.get("serviceArea");
//     const availability = formData.get("availability") === "true"; // checkbox → string
//     const skills = formData.getAll("skills"); // multiple select returns array

//     // Files (optional)
//     const profilePic = formData.get("profilePic"); // File object
//     const idProof = formData.get("idProof");       // File object

//     // ✅ Validation
//     if (!role || !fullName || !username || !email || !phone || !password) {
//       return new Response(
//         JSON.stringify({ error: "Please fill all required fields" }),
//         { status: 400 }
//       );
//     }

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 🌍 Geocode (for both serviceProvider + serviceNeeder)
//     let location = null;
//     if (address && city && state && country) {
//       const fullAddress = `${address || ""}, ${city || ""}, ${state || ""}, ${country || ""}, ${pincode || ""}`;

//       const geoRes = await fetch(
//         `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//           fullAddress
//         )}&key=${process.env.OPENCAGE_API_KEY}`
//       );

//       const geoData = await geoRes.json();

//       if (geoData.results.length > 0) {
//         const { lat, lng } = geoData.results[0].geometry;
//         location = { type: "Point", coordinates: [lng, lat] };
//       }
//     }

//     // ✅ Save User (files handling depends on storage: Cloudinary, S3, etc.)
//     const newUser = await User.create({
//       role,
//       fullName,
//       username,
//       email,
//       phone,
//       password: hashedPassword,
//       address,
//       pincode,
//       city,
//       district,
//       state,
//       country,
//       serviceCategory,
//       experience,
//       skills,
//       availability,
//       serviceArea,
//       location,
//       profilePic: profilePic ? profilePic.name : null, // store filename OR upload separately
//       idProof: idProof ? idProof.name : null,
//     });

//     return new Response(
//       JSON.stringify({
//         message: "User registered successfully",
//         user: {
//           id: newUser._id,
//           username: newUser.username,
//           role: newUser.role,
//           location: newUser.location,
//         },
//       }),
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("Signup Error:", err);
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }
