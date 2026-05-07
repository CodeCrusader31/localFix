import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import Review from "@/lib/models/Review";
import { getUserFromCookies } from "@/lib/utils/auth";

export async function GET(_req, context) {
  try {
    await connectDB();

    const authUser = await getUserFromCookies();
    const { id } = await context.params;

    if (authUser?.role !== "serviceProvider" || String(authUser.id) !== String(id)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const reviews = await Review.find({ providerId: id })
      .populate("customerId", "fullName")
      .sort({ createdAt: -1 })
      .lean();

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    return NextResponse.json({
      stats: {
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews: reviews.length,
        ratingDistribution: distribution,
      },
      reviews,
    });
  } catch (error) {
    console.error("Provider reviews error:", error);
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
  }
}
