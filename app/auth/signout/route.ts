import { createClient } from "@/lib/server/supabase";
import { redirect } from "next/navigation";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
