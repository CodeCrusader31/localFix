
// lib/models/Review.js
import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
}, { timestamps: true });

ReviewSchema.index({ providerId: 1, customerId: 1 }, { unique: true });

if (mongoose.models.Review && !mongoose.models.Review.schema.path("bookingId")) {
  mongoose.deleteModel("Review");
}

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);

