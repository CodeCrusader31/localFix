// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function getRoleFromToken(token) {
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload.role || null;
  } catch (e) {
    console.error("JWT verification failed:", e);
    return null;
  }
}

export async function middleware(request) {
  const authToken = request.cookies.get("auth-token")?.value;
  const userRole = await getRoleFromToken(authToken);

  const { pathname } = request.nextUrl;

  // Redirect logged-in users away from login/signup
  if (
    authToken &&
    (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Require authentication for generic dashboard
  if (pathname.startsWith("/dashboard") && !authToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Customer-only area
  if (pathname.startsWith("/customers")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (userRole !== "customer") {
      return NextResponse.redirect(
        new URL("/dashboard?denied=role", request.url)
      );
    }
  }

  // Provider-only area
  if (pathname.startsWith("/providers")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (userRole !== "provider" && userRole !== "admin") {
      return NextResponse.redirect(
        new URL("/dashboard?denied=role", request.url)
      );
    }
  }

  // Admin-only area (optional)
  if (pathname.startsWith("/admin")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (userRole !== "admin") {
      return NextResponse.redirect(
        new URL("/dashboard?denied=role", request.url)
      );
    }
  }

  // Pass role down to SSR
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-role", userRole || "guest");

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
