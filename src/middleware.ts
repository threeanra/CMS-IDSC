import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue to the requested page if token exists and is valid
  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/", "/document/:path*", "/dashboard"], // Protected routes
};
