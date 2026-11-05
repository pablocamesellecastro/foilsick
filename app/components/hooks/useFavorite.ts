import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";

const supabase = createBrowserSupabaseClient();

export function useFavorite(productId: string) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkFavorite = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoaded(true);

        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .maybeSingle();

      if (error) console.error("Error al comprobar:", error);
      setIsFavorite(!!data);
      setLoaded(true);
    };
    checkFavorite();
  }, [productId]);

  const handleFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/signin");
      return;
    }

    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);

      if (error) console.error("Error al insertar:", error);
      if (!error) setIsFavorite(false);
    } else {
      const { error } = await supabase.from("favorites").insert({
        user_id: user.id,
        product_id: productId,
      });

      if (error) console.error("Error al insertar:", error);
      if (!error) setIsFavorite(true);
    }
  };

  return { isFavorite, loaded, handleFavorite };
}
