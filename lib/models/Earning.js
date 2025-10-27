// lib/models/Earning.js
import mongoose from "mongoose";
const EarningSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId },
  paidAt: { type: Date, default: Date.now },
}, { timestamps: true });
export default mongoose.models.Earning || mongoose.model("Earning", EarningSchema);
