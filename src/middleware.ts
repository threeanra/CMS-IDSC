import { getToken } from "next-auth/jwt"; // Import getToken to fetch JWT
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Get the token directly using getToken instead of useSession
  const token = await getToken({ req });

  // Check if the token is not present or is invalid
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
  }

  // Continue to the requested page if the token exists
  return NextResponse.next();
}

// Specify the paths you want to protect
export const config = {
  matcher: ["/protected/:path*", "/", "/document/:path*", "/dashboard"], // Protected routes
};
