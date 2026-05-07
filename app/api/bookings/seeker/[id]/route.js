import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import Booking from "@/lib/models/Booking";
import { getUserFromCookies } from "@/lib/utils/auth";

export async function GET(req, context) {
  try {
    await connectDB();

    const authUser = await getUserFromCookies();
    if (!authUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = await context.params; // seekerId
    if (!id) {
      return NextResponse.json({ error: "Missing seeker id" }, { status: 400 });
    }

    // Only allow a user to access their own bookings
    if (String(authUser.id) !== String(id)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const bookings = await Booking.find({ seekerId: id })
      .populate("providerId", "fullName phone profilePic city state serviceCategory")
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (err) {
    console.error("Fetch bookings error:", err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

