import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";
import { getUserFromRequest } from "@/lib/utils/auth";

export async function GET(req) {
  await connectDB();
  const session = await getUserFromRequest(req);
  if (!session || session.role !== "serviceProvider") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await User.findById(session.id).select("-password");
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user, { status: 200 });
}

export async function PUT(req) {
  await connectDB();
  const session = await getUserFromRequest(req);
  if (!session || session.role !== "serviceProvider") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();

  // Optional: restrict fields that can be updated
  const allowed = [
    "fullName","phone","serviceCategory","skills","availability",
    "serviceArea","address","pincode","city","district","state","country",
    "profilePic","experience","location"
  ];
  const update = {};
  for (const k of allowed) if (k in data) update[k] = data[k];

  const updated = await User.findByIdAndUpdate(session.id, update, { new: true }).select("-password");
  return NextResponse.json(updated, { status: 200 });
}
