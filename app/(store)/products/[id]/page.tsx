"use server";

import { notFound } from "next/navigation";

import { supabase } from "@/lib/server/supabaseClient";
import ProductClient from "./ProductClient";

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

  return <ProductClient product={product} />;
}
