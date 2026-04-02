// // lib/utils/auth.js
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// export function generateToken(user) {
//   return jwt.sign(
//     { 
//       id: user._id, 
//       username: user.username, 
//       role: user.role,
//       email: user.email 
//     },
//     JWT_SECRET,
//     { expiresIn: '7d' }
//   );
// }

// export function verifyToken(token) {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (error) {
//     throw new Error('Invalid token');
//   }
// }

// lib/utils/auth.js
import jwt from "jsonwebtoken";
import {cookies} from 'next/headers';
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

// ✅ ADD THIS
export function getUserFromRequest(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) return null;

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) return null;

    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getUserFromCookies() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      console.error("Auth Error: No token found in cookies.");
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Auth Error: JWT verification failed.", error.message);
    return null;
  }
}