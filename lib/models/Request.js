// lib/models/Request.js
import mongoose from "mongoose";
const RequestSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceType: String,
    note: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
    },
    scheduledAt: Date,
  },
  { timestamps: true }
);
export default mongoose.models.Request ||
  mongoose.model("Request", RequestSchema);
