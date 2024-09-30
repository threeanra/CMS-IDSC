import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token;

    // Redirect ke login jika token tidak ada atau expired
    if (!token || token.expired) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token && !token.expired, // Hanya mengizinkan akses jika token ada dan tidak expired
    },
  }
);

export const config = {
  matcher: ["/protected/:path*", "/", "/document/:path*", "/dashboard"], // Ganti dengan rute yang dilindungi
};
