import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default async function DownloadPage({
  params,
}: {
  params: { sessionId: string };
}) {
  // Verificar que el pedido existe
  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("stripe_session_id", params.sessionId)
    .single();

  if (!order) redirect("/");

  // Generar enlace temporal de Supabase Storage (válido 1 hora)
  const { data } = await supabase.storage
    .from("products")
    .createSignedUrl("FOILSICK-808-001.zip", 3600);

  return (
    <div>
      <h1>Tu descarga está lista 🎉</h1>
      <a href={data?.signedUrl}>Descargar ahora</a>
    </div>
  );
}
