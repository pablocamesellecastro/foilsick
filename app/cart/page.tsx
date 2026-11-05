"use server";
import CartComponent from "@/components/cart/CartComponent";
import BackButton from "@/components/buttons/back-button/BackButton";
import { createClient } from "@/lib/server/supabase";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) redirect("/signin");

  const name = user.user_metadata?.full_name;
  const email = user.email;

  return (
    <div className="min-h-screen bg-neutral-0 text-black">
      <div className="flex justify-between mb-10">
        <Link
          href="/"
          aria-label="Volver a la página inicial"
          className="flex justify-between items-center pr-2 sticky top-0 z-50 h-12 pl-2"
        >
          <Image
            src="/images/Foilsick_logo_test_3.png"
            alt="Foilsick logo"
            width={150}
            height={150}
            className=""
          />
        </Link>

        <div className="flex flex-col items-end">
          {user ? (
            <a
              href="/account"
              className="hover:text-neutral-400 transition leading-none flex items-center pt-1 pr-2"
            >
              My Account
            </a>
          ) : (
            <div className="flex gap-2">
              <a href="/signin" className="hover:text-neutral-400 transition">
                Sign In
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto  p-6">
        <CartComponent />
      </div>
    </div>
  );
}
