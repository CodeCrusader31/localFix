// app/api/serviceProvider/me/requests/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import { getUserFromRequest } from "@/lib/utils/auth";
import Request from "@/lib/models/Request";

export async function GET(req) {
  await connectDB();
  const session = await getUserFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await Request
    .find({ providerId: session.id })
    .populate("customerId", "fullName email phone");
  return NextResponse.json(rows, { status: 200 });
}
