import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";

export async function GET(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Missing profile id" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Please login to view this profile" },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Only the owner can view/edit their profile
    if (String(payload.id) !== String(id)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const user = await User.findById(id).select(
      "-password -resetPasswordToken -resetPasswordExpires -__v"
    );

    if (!user) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (user.role !== "serviceNeeder") {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("ServiceNeeder profile fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Missing profile id" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (String(payload.id) !== String(id) || payload.role !== "serviceNeeder") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const data = await request.json();
    const allowed = [
      "fullName",
      "phone",
      "address",
      "pincode",
      "city",
      "district",
      "state",
      "country",
      "profilePic",
    ];

    const update = {};
    for (const key of allowed) {
      if (key in data) update[key] = data[key];
    }

    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true }).select(
      "-password -resetPasswordToken -resetPasswordExpires -__v"
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("ServiceNeeder profile update error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

