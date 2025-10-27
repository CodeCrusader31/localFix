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
