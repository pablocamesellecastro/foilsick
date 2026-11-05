"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";
import CartButton from "./buttons/cartButton/cartButton";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoaded(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="flex justify-between items-center pl-2 pr-2 sticky top-0 z-50 h-12">
      <Link
        href="/"
        aria-label="Volver a la página inicial"
        className="flex items-center pr-2 h-12"
      >
        <Image
          src="/images/Foilsick_logo_test_3.png"
          alt="Foilsick logo"
          width={150}
          height={150}
        />
      </Link>

      <div className="flex flex-col items-end justify-end gap-2">
        {!loaded ? (
          <span className="h-5 w-16" />
        ) : user ? (
          <Link
            href="/account"
            className="hover:text-neutral-400 transition leading-none flex items-center"
          >
            My Account
          </Link>
        ) : (
          <Link href="/signin" className="hover:text-neutral-400 transition">
            Sign in
          </Link>
        )}
        <CartButton />
      </div>
    </header>
  );
}
