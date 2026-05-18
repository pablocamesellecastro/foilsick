"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <header className="flex items-center justify-end p-4">
      {user ? (
        <a href="/account">My Account</a>
      ) : (
        <div className="flex gap-2">
          <a href="/login" className="hover:text-neutral-400 transition">
            Sign In
          </a>
          <span className="text-neutral-400">/</span>
          <a href="/register" className="hover:text-neutral-400 transition">
            Sign Up
          </a>
        </div>
      )}
    </header>
  );
}
