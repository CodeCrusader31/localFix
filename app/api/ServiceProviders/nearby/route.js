
// import { NextResponse } from "next/server";

// import connectDB from "@/lib/config/db";
// import User from "@/lib/models/User"


// export async function GET(req){
//     try {
//         await connectDB();
//         const {searchParams} = new URL(req.url);
//         const category = searchParams.get("serviceCategory");
//         const city = searchParams.get("city");

//         let query = {role : "serviceProvider"};
//         if(category) query.serviceCategory = category;
//         if(city) query.city = city;
//         const providers = await User.find(query).select("-password");
//         return NextResponse.json(providers);
//     } catch (err) {
//         return NextResponse.json({error:err.message},{status:500})
//     }
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category"); // plumber, electrician, etc.
    const lat = parseFloat(searchParams.get("lat"));
    const lng = parseFloat(searchParams.get("lng"));
    const radius = parseFloat(searchParams.get("radius")) || 5000; // default 5km
    const userId = searchParams.get("userId"); // logged-in serviceNeeder

    let finalLat = lat;
    let finalLng = lng;

    // 🔹 If no live lat/lng, fallback to serviceNeeder's DB location
    if ((!finalLat || !finalLng) && userId) {
      const user = await User.findById(userId);
      if (user?.location?.coordinates?.length === 2) {
        finalLng = user.location.coordinates[0]; // longitude
        finalLat = user.location.coordinates[1]; // latitude
      }
    }

    if (!finalLat || !finalLng) {
      return NextResponse.json({ error: "No location available" }, { status: 400 });
    }

    // 🔹 Find nearby service providers
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
      { $sort: { distance: 1 } } // ✅ sort by nearest first
    ]);

    //console.log("Geo search from:", finalLat, finalLng, "radius:", radius);


    return NextResponse.json({
      count: providers.length,
      providers,
    });
  } catch (err) {
    console.error("GET Providers Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
