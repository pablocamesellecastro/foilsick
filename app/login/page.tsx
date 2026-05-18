"use client";

import { createBrowserSupabaseClient } from "../../lib/supabaseBrowser";

const supabase = createBrowserSupabaseClient();

export default function LoginPage() {
  //__________________________________________________________________________________

  const handleGoogleSignIn = async () => {
    console.log("Iniciando login con Google...");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    console.log("data:", data);
    console.log("error:", error);

    if (data?.url) {
      window.location.href = data.url;
    }
  };

  //__________________________________________________________________________________

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else window.location.href = "/";
  };

  //__________________________________________________________________________________

  return (
    <div className="flex flex-col gap-4 p-8 max-w-sm mx-auto">
      <button
        onClick={handleGoogleSignIn}
        className="border px-4 py-2 hover:text-neutral-400 transition"
      >
        Continuar con Google
      </button>
    </div>
  );
}
