"use client";

import AuthProviders from "@/app/components/SessionProvider"; // Path ke AuthProviders
import RootLayoutClient from "@/app/components/RootClientLayout"; // Path ke layout client

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // tambahkan sesuai kebutuhan
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={poppins.className}>
      <body suppressHydrationWarning>
        <AuthProviders>
          {/* Render the client-side layout */}
          <RootLayoutClient>{children}</RootLayoutClient>
        </AuthProviders>
      </body>
    </html>
  );
}
