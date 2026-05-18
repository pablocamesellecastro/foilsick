import { stripe } from "@/lib/stripe/stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Cliente de supabase para el servidor
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return Response.json({ error: "Webhook inválido" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email ?? "";

    const { error } = await supabase.from("orders").insert({
      user_email: session.customer_details?.email,
      amount_total: session.amount_total! / 100,
      payment_status: session.payment_status,
      stripe_session_id: session.id,
    });

    const downloadUrl = `${process.env.NEXT_PUBLIC_URL}/download/${session.id}`;

    await resend.emails.send({
      from: "Foilsick <hello@foilsick.co>",
      to: email,
      subject: "Your purchase on Foilsick",
      html: `
        <h1>¡Thanks for your purchase!</h1>
        <p>Here is your download link:</p>
        <a href="${downloadUrl}">Download now</a>
        <p>This link is personal, do not share it.</p>
      `,
    });

    console.log("✅ Email enviado a:", email);
  }
  return Response.json({ ok: true });
}
