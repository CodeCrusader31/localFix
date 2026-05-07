import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import Booking from "@/lib/models/Booking";
import Earning from "@/lib/models/Earning";
import { getUserFromCookies } from "@/lib/utils/auth";

export async function GET(_req, context) {
  try {
    await connectDB();

    const authUser = await getUserFromCookies();
    const { id } = await context.params;

    if (authUser?.role !== "serviceProvider" || String(authUser.id) !== String(id)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const [earnings, completedJobs, pendingJobs] = await Promise.all([
      Earning.find({ providerId: id }).sort({ paidAt: -1 }).lean(),
      Booking.find({ providerId: id, status: "COMPLETED" })
        .populate("seekerId", "fullName")
        .sort({ updatedAt: -1 })
        .lean(),
      Booking.countDocuments({ providerId: id, paymentStatus: "PENDING" }),
    ]);

    const totalEarnings = earnings.reduce((sum, earning) => sum + (earning.amount || 0), 0);
    const completedCount = completedJobs.length;

    return NextResponse.json({
      summary: {
        totalEarnings,
        pendingPayments: pendingJobs,
        completedJobs: completedCount,
        averageEarning: completedCount > 0 ? totalEarnings / completedCount : 0,
      },
      transactions: earnings.map((earning) => {
        const job = completedJobs.find(
          (booking) => String(booking._id) === String(earning.jobId)
        );
        return {
          _id: earning._id,
          job: job?.serviceType || "Service booking",
          client: job?.seekerId?.fullName || "Customer",
          date: earning.paidAt || earning.createdAt,
          amount: earning.amount,
          status: "PAID",
        };
      }),
      completedJobsWithoutEarnings: completedJobs.filter(
        (booking) => !earnings.some((earning) => String(earning.jobId) === String(booking._id))
      ),
    });
  } catch (error) {
    console.error("Provider earnings error:", error);
    return NextResponse.json({ error: "Failed to load earnings" }, { status: 500 });
  }
}
