import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    console.log("Profile API called for ID:", id);

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Please login to view this profile" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    let payload;
    try {
      ({ payload } = await jwtVerify(token, secret));
    } catch (error) {
      return NextResponse.json({ error: "Invalid authentication token" }, { status: 401 });
    }

    if (!id || id.length !== 24) {
      return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
    }

    const user = await User.findById(id).select("-password -resetPasswordToken -resetPasswordExpires -__v");

    if (!user) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (String(payload.id) === String(user._id)) {
      return NextResponse.json({ user, isOwnProfile: true }, { status: 200 });
    }

    const publicProfile = {
      _id: user._id,
      fullName: user.fullName,
      role: user.role,
      serviceCategory: user.serviceCategory,
      skills: user.skills,
      availability: user.availability,
      serviceArea: user.serviceArea,
      city: user.city,
      state: user.state,
      profilePic: user.profilePic,
      experience: user.experience,
      rating: user.rating,
      reviewCount: user.reviewCount
    };

    return NextResponse.json({ user: publicProfile, isOwnProfile: false }, { status: 200 });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (String(payload.id) !== String(id) || payload.role !== "serviceProvider") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const data = await request.json();
    const allowed = [
      "fullName", "phone", "serviceCategory", "skills", "availability",
      "serviceArea", "address", "pincode", "city", "district", "state", "country",
      "profilePic", "experience", "location"
    ];

    const update = {};
    for (const key of allowed) {
      if (key in data) update[key] = data[key];
    }

    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true })
      .select("-password -resetPasswordToken -resetPasswordExpires -__v");

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
