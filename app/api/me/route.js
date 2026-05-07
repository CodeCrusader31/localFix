// // app/api/me/route.js
// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// function parseCookie(header, name) {
//   if (!header) return undefined;
//   const parts = header.split(";").map(p => p.trim());
//   const match = parts.find(p => p.startsWith(name + "="));
//   if (!match) return undefined;
//   return decodeURIComponent(match.split("=")[1]);
// }

// export async function GET(request) {
//   try {
//     const cookieHeader = request.headers.get("cookie") || "";
//     const token = parseCookie(cookieHeader, "auth-token");
//     if (!token) return NextResponse.json({ role: "guest" });

//     try {
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//       const { payload } = await jwtVerify(token, secret);
//       return NextResponse.json({ role: payload.role || "guest" });
//     } catch (e) {
//       return NextResponse.json({ role: "guest" });
//     }
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ role: "guest" });
//   }
// }


// app/api/me/route.js
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";

export async function GET() {
  try {
    // ✅ Await cookies() in App Router route handlers
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ user: null, role: "guest" }),
        { status: 200 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    await connectDB();
    const dbUser = await User.findById(payload.id).select(
      "fullName username email role phone profilePic serviceCategory city state"
    );

    if (!dbUser) {
      return new Response(
        JSON.stringify({ user: null, role: "guest" }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        user: {
          id: String(dbUser._id),
          _id: String(dbUser._id),
          fullName: dbUser.fullName,
          username: dbUser.username,
          email: dbUser.email,
          role: dbUser.role || "guest",
          phone: dbUser.phone,
          profilePic: dbUser.profilePic,
          serviceCategory: dbUser.serviceCategory,
          city: dbUser.city,
          state: dbUser.state,
        },
        role: dbUser.role || "guest",
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ user: null, role: "guest" }),
      { status: 200 }
    );
  }
}
