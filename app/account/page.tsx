import { createClient } from "@/lib/server/supabase";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name = user.user_metadata.full_name;
  const avatar = user.user_metadata.avatar_url;
  const email = user.email;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-10">
        <a
          href="/"
          className="text-neutral-400 hover:text-black transition text-sm"
        >
          ← back
        </a>

        <div className="flex items-center gap-3 text-right">
          <div>
            <p className="font-medium leading-none">{name}</p>
            <p className="text-neutral-400 text-xs">{email}</p>
          </div>

          {avatar && (
            <Image
              src={avatar}
              alt="Avatar"
              width={42}
              height={42}
              className="rounded-full"
            />
          )}
        </div>
      </div>

      <hr className="border-neutral-200 mb-8" />

      <div className="mb-8">
        <p className="text-xs text-neutral-400 uppercase tracking-widest mb-3">
          Purchases
        </p>
        <p className="text-neutral-400 italic text-sm">No purchases yet.</p>
      </div>

      <hr className="border-neutral-200 mb-8" />

      <div className="mb-8">
        <p className="text-xs text-neutral-400 uppercase tracking-widest mb-3">
          Favorites
        </p>
        <p className="text-neutral-400 italic text-sm">No favorites yet.</p>
      </div>

      <hr className="border-neutral-200 mb-8" />

      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className="text-neutral-400 hover:text-black transition text-sm"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
