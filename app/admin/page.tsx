import { createClient } from "@/lib/server/supabase";
import { supabase } from "@/lib/server/supabaseClient";
import AdminClient from "./AdminClient";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user || user.email !== "pablocamstro@gmail.com") {
    redirect("/");
  }

  const { data: products } = await supabase.from("products").select("*");

  return <AdminClient products={products || []} />;
}
