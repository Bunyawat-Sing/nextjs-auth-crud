"use client";

import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <Navbar session={session} />
      <div className="container mx-auto">
        <h3>Welcome to home page</h3>
        <hr className="my-3" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          facilis porro, sunt beatae voluptatum fugit praesentium dignissimos
          impedit incidunt cupiditate architecto delectus, unde expedita? Aut
          quasi expedita enim deleniti necessitatibus!
        </p>
      </div>
    </main>
  );
}
