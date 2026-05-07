import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import Booking from "@/lib/models/Booking";
import Review from "@/lib/models/Review";
import User from "@/lib/models/User";
import { getUserFromCookies } from "@/lib/utils/auth";

function buildStats(reviews) {
  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach((review) => {
    ratingDistribution[review.rating] = (ratingDistribution[review.rating] || 0) + 1;
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return {
    averageRating: Number(averageRating.toFixed(1)),
    totalReviews: reviews.length,
    ratingDistribution,
  };
}

export async function GET(_req, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const authUser = await getUserFromCookies();

    const reviews = await Review.find({ providerId: id })
      .populate("customerId", "fullName profilePic")
      .populate("bookingId", "serviceType scheduledAt")
      .sort({ createdAt: -1 })
      .lean();

    let eligibleBooking = null;
    let userReview = null;

    if (authUser?.role === "serviceNeeder") {
      eligibleBooking = await Booking.findOne({
        providerId: id,
        seekerId: authUser.id,
        status: "COMPLETED",
      })
        .sort({ updatedAt: -1 })
        .select("_id serviceType scheduledAt")
        .lean();

      userReview = await Review.findOne({
        providerId: id,
        customerId: authUser.id,
      }).lean();
    }

    return NextResponse.json({
      reviews,
      stats: buildStats(reviews),
      canReview: Boolean(eligibleBooking && !userReview),
      eligibleBooking,
      userReview,
    });
  } catch (error) {
    console.error("Public feedback fetch error:", error);
    return NextResponse.json({ error: "Failed to load feedback" }, { status: 500 });
  }
}

export async function POST(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const authUser = await getUserFromCookies();

    if (!authUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (authUser.role !== "serviceNeeder") {
      return NextResponse.json(
        { error: "Only service needers can leave feedback" },
        { status: 403 }
      );
    }

    const provider = await User.findOne({ _id: id, role: "serviceProvider" }).select("_id");
    if (!provider) {
      return NextResponse.json({ error: "Service provider not found" }, { status: 404 });
    }

    const { rating, comment } = await req.json();
    const numericRating = Number(rating);

    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const eligibleBooking = await Booking.findOne({
      providerId: id,
      seekerId: authUser.id,
      status: "COMPLETED",
    })
      .sort({ updatedAt: -1 })
      .select("_id")
      .lean();

    if (!eligibleBooking) {
      return NextResponse.json(
        { error: "You can leave feedback only after completing a booking with this provider" },
        { status: 403 }
      );
    }

    const existingReview = await Review.findOne({
      providerId: id,
      customerId: authUser.id,
    }).select("_id");

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already left feedback for this provider" },
        { status: 409 }
      );
    }

    const review = await Review.create({
      providerId: id,
      customerId: authUser.id,
      bookingId: eligibleBooking._id,
      rating: numericRating,
      comment: String(comment || "").trim(),
    });

    await review.populate("customerId", "fullName profilePic");
    await review.populate("bookingId", "serviceType scheduledAt");

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json(
        { error: "You have already left feedback for this provider" },
        { status: 409 }
      );
    }

    console.error("Create feedback error:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}
