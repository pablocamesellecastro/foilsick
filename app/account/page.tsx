import { createClient } from "@/lib/server/supabase";
import Image from "next/image";
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
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-10">
        <BackButton />

        <div className="flex items-center gap-3 text-right">
          <div>
            <p className="font-medium leading-none">{name}</p>
          </div>

          {avatar && (
            <Image
              src={avatar}
              alt="Avatar"
              width={42}
              height={42}
              className="rounded-full"
            />
          )}
        </div>
      </div>

      <div className="flex flex-row justify-between pb-3">
        <h1 className="text-xl font-bold">Favorites</h1>
        <CartButton />
      </div>

      <div className="mb-8">
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
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="text-neutral-400 hover:text-black transition text-sm"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
