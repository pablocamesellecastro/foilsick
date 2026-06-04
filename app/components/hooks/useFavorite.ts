import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";

const supabase = createBrowserSupabaseClient();

export function useFavorite(productId: string) {
  const [favoriteIcon, setFavoriteIcon] = useState("outline");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single();

      setFavoriteIcon(data ? "filled" : "outline");
      setLoaded(true);
    };
    checkFavorite();
  }, [productId]);

  const handleFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    if (favoriteIcon === "filled") {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
      setFavoriteIcon("outline");
    } else {
      await supabase.from("favorites").insert({
        user_id: user.id,
        product_id: productId,
      });
      setFavoriteIcon("filled");
    }
  };

  return { favoriteIcon, loaded, handleFavorite };
}
