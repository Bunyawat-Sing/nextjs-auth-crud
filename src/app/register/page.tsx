"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
  if (session) {
    redirect("/welcome");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Invalid email format!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all inputs!");
      return;
    }

    try {
      const resCheckUser = await fetch("/api/checkUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const { user } = await resCheckUser.json();

      if (user) {
        setError("User already exists!");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        setError("");
        setSuccess("User registration successful!");
        (e.target as HTMLFormElement).reset();
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar session={session} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">
            Create Account
          </h3>
          <div className="border-b border-blue-500/20 mb-6" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-600/20 text-red-300 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-600/20 text-green-300 p-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder="Full Name"
            />
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
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="password"
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="border-b border-blue-500/20 my-6" />
          <p className="text-gray-400 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
