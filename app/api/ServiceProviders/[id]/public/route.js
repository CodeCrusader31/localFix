import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    console.log("🟢 Public profile API called for ID:", id);
    
    // Find user by ID (public information only)
    const user = await User.findById(id).select("-password -__v -updatedAt");
    
    if (!user) {
      console.log("🔴 User not found");
      return NextResponse.json({ error: "Service provider not found" }, { status: 404 });
    }

    // Check if user is a service provider
    if (user.role !== "serviceProvider") {
      console.log("🔴 User is not a service provider");
      return NextResponse.json({ error: "Service provider not found" }, { status: 404 });
    }

    console.log("🟢 User found:", user.fullName);
    
    // Return public profile data
    const publicProfile = {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
      address: user.address,
      pincode: user.pincode,
      city: user.city,
      district: user.district,
      state: user.state,
      country: user.country,
      serviceCategory: user.serviceCategory,
      experience: user.experience,
      skills: user.skills,
      availability: user.availability,
      serviceArea: user.serviceArea,
      location: user.location,
      createdAt: user.createdAt
    };

    return NextResponse.json(publicProfile, { status: 200 });
  } catch (error) {
    console.error("🔴 Public profile fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}