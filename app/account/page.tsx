import { createClient } from "@/lib/server/supabase";
import { redirect } from "next/navigation";
import FavoriteProductCard from "@/components/product/FavoriteProductCard";
import CartButton from "@/app/components/buttons/cartButton/cartButton";
import BackButton from "@/app/components/buttons/back-button/BackButton";
import Link from "next/link";
import Image from "next/image";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

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
    <div className="">
      <div className="flex justify-between mb-10  bg-neutral-0 text-black">
        <Link
          href="/"
          aria-label="Volver a la página inicial"
          className="flex justify-between items-center pr-2 sticky top-0 z-50 h-12 pl-2"
        >
          <Image
            src="/images/Foilsick_logo_test_3.png"
            alt="Foilsick logo"
            width={150}
            height={150}
            className=""
          />
        </Link>

        <div className="flex flex-col pt-1 pr-2">
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

      <div className="flex flex-row justify-between p-3">
        <h1 className=" text-xl font-bold">Favorites</h1>
        <CartButton />
      </div>

      <div className="p-3">
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
