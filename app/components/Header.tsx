"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";
import CartButton from "./buttons/cartButton/cartButton";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <header className="flex justify-between items-center pl-2 pr-2 sticky top-0 z-50 h-12">
      <Image
        src="/images/Foilsick_logo_test_3.png"
        alt="Foilsick logo"
        width={150}
        height={150}
        className="h-12 w-auto"
      />
      <div className="flex flex-col items-end justify-end p-3 bg-background">
        {user ? (
          <a
            href="/account"
            className="hover:text-neutral-400 transition leading-none flex items-center"
          >
            My Account
          </a>
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
        <CartButton />
      </div>
    </header>
  );
}
