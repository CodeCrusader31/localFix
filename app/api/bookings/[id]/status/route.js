import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import Booking from "@/lib/models/Booking";
import { getUserFromCookies } from "@/lib/utils/auth";

const ALLOWED_STATUSES = new Set([
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
]);

export async function PATCH(req, context) {
  try {
    await connectDB();

    const authUser = await getUserFromCookies();
    if (!authUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await context.params;
    const { status } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
    }

    if (!ALLOWED_STATUSES.has(status)) {
      return NextResponse.json({ error: "Invalid booking status" }, { status: 400 });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const isProvider = String(booking.providerId) === String(authUser.id);
    const isSeeker = String(booking.seekerId) === String(authUser.id);

    if (!isProvider && !isSeeker) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (authUser.role === "serviceNeeder" && status !== "CANCELLED") {
      return NextResponse.json(
        { error: "Service needers can only cancel bookings" },
        { status: 403 }
      );
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    await updatedBooking.populate([
      { path: "seekerId", select: "fullName phone email address city state" },
      { path: "providerId", select: "fullName phone email city state serviceCategory" },
    ]);

    return NextResponse.json({ booking: updatedBooking }, { status: 200 });
  } catch (err) {
    console.error("Update booking status error:", err);
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 }
    );
  }
}
