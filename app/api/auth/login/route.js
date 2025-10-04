
// app/api/auth/login/route.js
import connectDB from "@/lib/config/db";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/utils/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();
    const { usernameOrEmail, password } = await req.json();

    if (!usernameOrEmail || !password) {
      return new Response(
        JSON.stringify({ error: "Username/email and password are required" }),
        { status: 400 }
      );
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // Generate JWT
    const token = generateToken(user);
    // Set token in HttpOnly cookie
     const cookieStore = await cookies();  // ✅ FIX
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    // Return user info (without password)
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      phone: user.phone,
    };

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: userData,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}
