"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        router.push("/welcome");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (status === "loading") {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Navbar session={session} />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-blue-400 mb-4 text-center">
            Create New Post
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-blue-400"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 px-4 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-blue-400"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 px-4 py-2"
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
