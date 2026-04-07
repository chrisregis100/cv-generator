import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Paths accessible without authentication (guest-friendly)
const GUEST_ALLOWED_PATHS = ["/dashboard", "/dashboard/cv/new"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (GUEST_ALLOWED_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
