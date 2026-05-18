import { createClient } from "@/lib/server/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  } else {
    console.log("No code found in the callback URL");
  }

  return NextResponse.redirect(origin);
}
