"use client";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ".././globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/sidebar/sidebar";
import Navbar from "@/app/components/navbar/navbar";
import { useEffect } from "react";

config.autoAddCss = false;

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";

  // Dynamically update the title on the client side
  useEffect(() => {
    document.title =
      pathname === "/login"
        ? "Login - CMS Console ID Smart Care"
        : "CMS Console ID Smart Care";
  }, [pathname]);

  return (
    <div className="antialiased" suppressHydrationWarning>
      {isAuthPage ? (
        <div className="flex flex-row w-full">{children}</div>
      ) : (
        <div className="flex flex-row w-full">
          <Sidebar />
          <div className="w-full">
            <Navbar />
            <div className="mx-10 pb-10">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
