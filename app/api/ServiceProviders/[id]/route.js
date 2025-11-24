import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";

// GET /api/ServiceProviders/[id]
export async function GET(req, context) {
  try {
    await connectDB();

    // ✅ await context.params
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Provider ID is required" }, { status: 400 });
    }

    const provider = await User.findOne({ _id: id, role: "serviceProvider" }).select(
      "-password" // exclude sensitive fields
    );

    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    return NextResponse.json(provider);
  } catch (err) {
    console.error("GET Provider by ID Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// export async function GET(req, context) {
//   const { params } = await context;
//   const { id } = params;
  
//   console.log("🟢 Public profile API called for ID:", id);

//   await connectDB();

//   const provider = await ServiceProvider.findById(id).select(
//     "fullName serviceCategory city state email phone profilePic"
//   );

//   if (!provider) {
//     return new Response(
//       JSON.stringify({ error: "Service provider not found" }),
//       { status: 404 }
//     );
//   }

//   return new Response(JSON.stringify(provider), { status: 200 });
// }
