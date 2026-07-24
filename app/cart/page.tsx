"use server";
import CartComponent from "@/components/cart/CartComponent";
import BackButton from "@/components/buttons/back-button/BackButton";
import { createClient } from "@/lib/server/supabase";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) redirect("/login");

  const name = user.user_metadata?.full_name;
  const email = user.email;

  return (
    <div className="min-h-screen bg-neutral-0 text-black p-6">
      <div className="flex justify-between mb-10">
        <div className="align-top">
          <BackButton />
        </div>

        <div className="flex flex-col">
          <p className="text-end">{name}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
          <form action="/auth/signout" method="post" className="text-end">
            <button
              type="submit"
              className=" text-neutral-400 hover:text-black transition text-sm"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto  p-6">
        <CartComponent />
      </div>
    </div>
  );
}
