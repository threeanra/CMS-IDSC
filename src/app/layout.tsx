"use client";

import AuthProviders from "@/app/components/SessionProvider"; // Path ke AuthProviders
import RootLayoutClient from "@/app/components/RootClientLayout"; // Path ke layout client

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body suppressHydrationWarning>
        <AuthProviders>
          {/* Render the client-side layout */}
          <RootLayoutClient>{children}</RootLayoutClient>
        </AuthProviders>
      </body>
    </html>
  );
}
