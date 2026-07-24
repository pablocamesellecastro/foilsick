import { createClient } from "@/lib/server/supabase";
import { redirect } from "next/navigation";
import FavoriteProductCard from "@/components/product/FavoriteProductCard";
import CartButton from "@/app/components/buttons/cartButton/cartButton";
import BackButton from "@/app/components/buttons/back-button/BackButton";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Favoritos
  const { data: favs, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return [];
  }

  const productIds = favs?.map((fav) => fav.product_id) || [];

  const { data: products, error: productsError } = productIds.length
    ? await supabase.from("products").select("*").in("id", productIds)
    : { data: [] };

  const name = user.user_metadata.full_name;
  const avatar = user.user_metadata.avatar_url;
  const email = user.email;

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between mb-10">
        <div className="flex align-top">
          <BackButton />
        </div>

        <div className="flex flex-col">
          <p className="text-end">{name}</p>

          <form action="/auth/signout" method="post" className="text-end">
            <button
              type="submit"
              className=" text-neutral-400 hover:text-black transition text-sm"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-row justify-between pb-3">
        <h1 className=" text-xl font-bold">Favorites</h1>
        <CartButton />
      </div>

      <div className="">
        <div className="mb-3">
          <div className="flex flex-col gap-4 mt-4">
            {products && products.length > 0 ? (
              products.map((product) => (
                <FavoriteProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-neutral-500">No favorites yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
