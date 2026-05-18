"use client";
import { supabase } from "@/lib/server/supabaseClient";

export default function SignInButton() {
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return <button onClick={handleSignIn}>Sign In</button>;
}
