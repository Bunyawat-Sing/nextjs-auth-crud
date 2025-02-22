"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";

interface Post {
  _id: string;
  title: string;
  content: string;
}

export default function Welcome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchPosts();
    }
  }, [status, router]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost({ ...post });
  };

  const handleUpdate = async () => {
    if (!editingPost) return;

    try {
      const res = await fetch(`/api/posts/${editingPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle: editingPost.title,
          newContent: editingPost.content,
        }),
      });
      if (res.ok) {
        setEditingPost(null);
        fetchPosts();
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar session={session} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-400">Team Posts</h1>
            <Link
              href="/create-post"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Create New Post
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-gray-400">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-400">No posts found.</div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-800 rounded-xl p-4 shadow-lg border border-blue-500/20"
                >
                  {editingPost && editingPost._id === post._id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 text-gray-100 rounded-lg p-2"
                      />
                      <textarea
                        value={editingPost.content}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            content: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 text-gray-100 rounded-lg p-2 h-32"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdate}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingPost(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-gray-300">{post.content}</p>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEdit(post)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
