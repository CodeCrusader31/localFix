

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/config/db";
// import User from "@/lib/models/User";

// export async function GET(req) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(req.url);

//     const category = searchParams.get("category"); // plumber, electrician, etc.
//     const lat = parseFloat(searchParams.get("lat"));
//     const lng = parseFloat(searchParams.get("lng"));
//     const radius = parseFloat(searchParams.get("radius")) || 5000; // default 5km
//     const userId = searchParams.get("userId"); // logged-in serviceNeeder

//     let finalLat = lat;
//     let finalLng = lng;

//     // 🔹 If no live lat/lng, fallback to serviceNeeder's DB location
//     if ((!finalLat || !finalLng) && userId) {
//       const user = await User.findById(userId);
//       if (user?.location?.coordinates?.length === 2) {
//         finalLng = user.location.coordinates[0]; // longitude
//         finalLat = user.location.coordinates[1]; // latitude
//       }
//     }

//     if (!finalLat || !finalLng) {
//       return NextResponse.json({ error: "No location available" }, { status: 400 });
//     }

//     // 🔹 Find nearby service providers
//     const providers = await User.aggregate([
//       {
//         $geoNear: {
//           near: { type: "Point", coordinates: [finalLng, finalLat] },
//           distanceField: "distance",
//           maxDistance: radius,
//           spherical: true,
//           query: {
//             role: "serviceProvider",
//             ...(category ? { serviceCategory: category.toLowerCase() } : {})
//           }
//         }
//       },
//       { $sort: { distance: 1 } } // ✅ sort by nearest first
//     ]);

//     //console.log("Geo search from:", finalLat, finalLng, "radius:", radius);


//     return NextResponse.json({
//       count: providers.length,
//       providers,
//     });
//   } catch (err) {
//     console.error("GET Providers Error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";
import initRedis from "@/lib/redis";

export async function GET(req) {
  const start = performance.now(); // Start timer

  try {
    await connectDB();
    const redis = await initRedis();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const lat = parseFloat(searchParams.get("lat"));
    const lng = parseFloat(searchParams.get("lng"));
    const radius = parseFloat(searchParams.get("radius")) || 5000;
    const userId = searchParams.get("userId");

    let finalLat = lat;
    let finalLng = lng;

    // 🔹 If no live location, fallback to user's DB location
    if ((!finalLat || !finalLng) && userId) {
      const user = await User.findById(userId);
      if (user?.location?.coordinates?.length === 2) {
        finalLng = user.location.coordinates[0];
        finalLat = user.location.coordinates[1];
      }
    }

    if (!finalLat || !finalLng) {
      return NextResponse.json(
        { error: "No location available" },
        { status: 400 }
      );
    }

    // 🔹 Redis cache key
    const cacheKey = `providers:${category || "all"}:${finalLat}:${finalLng}:${radius}`;

    // *****************************************
    // 🚀 CHECK REDIS CACHE
    // *****************************************
    const cached = await redis.get(cacheKey);

    if (cached) {
      const end = performance.now();

      console.log(
        `⚡ Redis Cache Hit | Latency: ${(end - start).toFixed(2)} ms`
      );

      const response = NextResponse.json(JSON.parse(cached));
      response.headers.set("X-Cache", "HIT"); // Show in Network tab

      return response;
    }

    // *****************************************
    // 🐌 MONGODB QUERY (first-time request)
    // *****************************************
    const providers = await User.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [finalLng, finalLat] },
          distanceField: "distance",
          maxDistance: radius,
          spherical: true,
          query: {
            role: "serviceProvider",
            ...(category ? { serviceCategory: category.toLowerCase() } : {})
          }
        }
      },
      { $sort: { distance: 1 } }
    ]);

    const result = {
      count: providers.length,
      providers,
    };

    // Cache for 5 minutes
    await redis.setEx(cacheKey, 300, JSON.stringify(result));

    const end = performance.now();

    console.log(
      `🐌 MongoDB Query (NO Cache) | Latency: ${(end - start).toFixed(2)} ms`
    );

    const response = NextResponse.json(result);
    response.headers.set("X-Cache", "MISS");

    return response;

  } catch (err) {
    console.error("GET Providers Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

