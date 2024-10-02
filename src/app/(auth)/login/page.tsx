"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/logo-login.png";
import Image from "next/image";
import Button from "@/app/components/button/button";
import Loading from "@/app/components/loading/loading";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to the dashboard if the user is already logged in
      router.replace("/document"); // Use replace to avoid adding to history stack
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });
      // console.log(status);

      if (result?.error) {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-cyan-500 to-white p-5">
      <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <Image
            src={logo}
            width={280}
            alt="Logo"
            className="self-center my-3"
          />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username </span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="form-control mt-6">
            <Button
              title={loading ? <Loading type="sm" /> : "Login"}
              size="md"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
