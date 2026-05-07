import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import Booking from "@/lib/models/Booking";
import Earning from "@/lib/models/Earning";
import Review from "@/lib/models/Review";
import User from "@/lib/models/User";
import { getUserFromCookies } from "@/lib/utils/auth";

function assertProviderOwner(authUser, id) {
  return authUser?.role === "serviceProvider" && String(authUser.id) === String(id);
}

export async function GET(_req, context) {
  try {
    await connectDB();

    const authUser = await getUserFromCookies();
    const { id } = await context.params;

    if (!assertProviderOwner(authUser, id)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const [provider, bookings, earnings, reviews] = await Promise.all([
      User.findOne({ _id: id, role: "serviceProvider" }).select(
        "-password -resetPasswordToken -resetPasswordExpires -__v"
      ),
      Booking.find({ providerId: id })
        .populate("seekerId", "fullName phone email city state")
        .sort({ createdAt: -1 })
        .limit(8),
      Earning.find({ providerId: id }).sort({ paidAt: -1 }).limit(50),
      Review.find({ providerId: id }).populate("customerId", "fullName").sort({ createdAt: -1 }),
    ]);

    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const totalEarnings = earnings.reduce((sum, item) => sum + (item.amount || 0), 0);
    const completedJobs = await Booking.countDocuments({ providerId: id, status: "COMPLETED" });
    const activeJobs = await Booking.countDocuments({
      providerId: id,
      status: { $in: ["ACCEPTED", "IN_PROGRESS"] },
    });
    const pendingRequests = await Booking.countDocuments({ providerId: id, status: "PENDING" });
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    return NextResponse.json({
      provider,
      stats: {
        activeJobs,
        pendingRequests,
        completedJobs,
        totalEarnings,
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews: reviews.length,
      },
      recentBookings: bookings,
      recentReviews: reviews.slice(0, 3),
    });
  } catch (error) {
    console.error("Provider dashboard error:", error);
    return NextResponse.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}
