import PageLayoutFoilsick from "../../components/PageLayoutFoilsick";

import { createClient } from "@/lib/server/supabase";

export default async function StoreLayout({ children }) {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*");

  return (
    <PageLayoutFoilsick products={products}>{children}</PageLayoutFoilsick>
  );
}
