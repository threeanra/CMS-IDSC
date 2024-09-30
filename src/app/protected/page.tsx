// app/protected/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return <div>Access denied. You need to log in to view this page.</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session?.user?.username}!</p>
      <p>Email: {session?.user?.email}</p>
      <button
        onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
      >
        Logout
      </button>
    </div>
  );
}
