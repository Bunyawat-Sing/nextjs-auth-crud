"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/welcome");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res || res.error) {
        setError("Invalid credentials");
        return;
      }

      router.replace("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar session={session} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">
            Welcome Back
          </h3>
          <div className="border-b border-blue-500/20 mb-6" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-600/20 text-red-300 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="email"
              placeholder="Email Address"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="password"
              placeholder="Password"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="border-b border-blue-500/20 my-6" />
          <p className="text-gray-400 text-center">
            New user?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
