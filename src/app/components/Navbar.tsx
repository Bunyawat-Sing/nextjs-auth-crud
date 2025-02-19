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
    <nav className="bg-black text-white p-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">Home</Link>
          </div>
          <ul className="flex gap-3">
            {!session ? (
              <>
                <li>
                  <Link href="/login">Sign In</Link>
                </li>
                <li>
                  <Link href="/register">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/welcome"
                    className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => signOut()}
                    className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                  >
                    Logout
                  </a>
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
