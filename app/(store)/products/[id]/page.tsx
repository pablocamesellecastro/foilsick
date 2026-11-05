import { notFound } from "next/navigation";

import { supabase } from "@/lib/server/supabaseClient";
import ProductClient from "./ProductClient";
import RelatedProducts from "@/app/components/product/RelatedProducts";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) return notFound();

  const { data: related } = await supabase
    .from("products")
    .select("*")
    .neq("id", id)
    .limit(6);

  return (
    <>
      <ProductClient product={product} />
      <RelatedProducts products={related ?? []} />
    </>
  );
}
