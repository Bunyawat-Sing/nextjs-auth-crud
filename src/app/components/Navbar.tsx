"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

function Navbar({ session }: NavbarProps) {
  return (
    <nav className="bg-gray-900 border-b border-blue-500/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors"
          >
            TechTeam
          </Link>

          <ul className="flex items-center gap-6">
            {!session ? (
              <>
                <li>
                  <Link
                    href="/login"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/welcome"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Posts
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
