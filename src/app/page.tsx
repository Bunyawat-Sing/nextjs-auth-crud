"use client";

import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { FaUsers, FaEdit, FaSignInAlt, FaRocket } from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      icon: <FaEdit className="w-8 h-8 text-blue-500" />,
      title: "Collaborative Posting",
      description:
        "Work with your team to create and manage posts efficiently.",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-blue-500" />,
      title: "Team Collaboration",
      description: "Seamless communication and task management with your team.",
    },
    {
      icon: <FaSignInAlt className="w-8 h-8 text-blue-500" />,
      title: "User Authentication",
      description:
        "Secure registration and login system with OAuth integration.",
    },
    {
      icon: <FaRocket className="w-8 h-8 text-blue-500" />,
      title: "Growth and Engagement",
      description:
        "Enhance your community engagement with interactive features.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar session={session} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-900/30 to-gray-900">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-blue-400 mb-6">
            Welcome to TechTeam
            <span className="text-white"> Platform</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Empower your development team with collaborative tools, secure
            environments, and seamless project management solutions.
          </p>
          {!session && (
            <div className="flex justify-center gap-4">
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="border border-blue-500 text-blue-400 hover:bg-blue-900/20 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Team Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-blue-400 text-center mb-12">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 bg-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            © {new Date().getFullYear()} TechTeam. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
