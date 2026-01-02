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
