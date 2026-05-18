//import { PRODUCTS } from "@/mocks/products";
import { createClient } from "./supabase";

export async function getProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data;
}

export async function getProduct(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}
