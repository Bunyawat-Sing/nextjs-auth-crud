"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function WelcomePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      redirect("/login");
    } else {
      setLoading(false);
    }
  }, [session, status]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar session={session} />
      <div className="container mx-auto">
        <h3 className="text-3xl my-3">Welcome {session?.user?.name}</h3>
        <p>Email: {session?.user?.email}</p>
        <hr className="my-3" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In quos dicta
          amet ratione, unde repellat ipsa nesciunt repellendus expedita natus
          fugit aut nobis accusantium vitae ipsam incidunt placeat! Impedit,
          porro!
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
