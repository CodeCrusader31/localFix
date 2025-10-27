
// lib/models/Review.js
import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
}, { timestamps: true });
export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);

