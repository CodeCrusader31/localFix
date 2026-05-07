import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import Booking from "@/lib/models/Booking";
import { getUserFromCookies } from "@/lib/utils/auth";

export async function GET(_req, context) {
  try {
    await connectDB();

    const authUser = await getUserFromCookies();
    if (!authUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Missing provider id" }, { status: 400 });
    }

    if (String(authUser.id) !== String(id) || authUser.role !== "serviceProvider") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const bookings = await Booking.find({ providerId: id })
      .populate("seekerId", "fullName phone email address city state")
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (err) {
    console.error("Fetch provider bookings error:", err);
    return NextResponse.json(
      { error: "Failed to fetch provider bookings" },
      { status: 500 }
    );
  }
}
