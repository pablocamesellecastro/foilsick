import ProductComponent from "@/components/product/ProductComponent";

import { createClient } from "@/lib/server/supabase";
import CartButton from "@/app/components/buttons/cartButton/cartButton";

export default async function Page() {
  const supabase = await createClient();

  const { data: products, error } = await supabase.from("products").select("*");

  if (error || !products) {
    console.log(error);
    return <div>Error cargando productos</div>;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sortedProducts = products.sort(
    (a, b) => a.display_index - b.display_index,
  );

  return (
    <div className="p-3 w-full lg:w-7/12 h-full">
      <div className="flex flex-row justify-end pb-4">
        <CartButton />
      </div>
      <div>
        <p className="lg:pl-40 text-justify text-neutral-700">
          Foilsick is a curated collection of digital products for music
          production. Every item in the catalog is designed to inspire,
          accelerate the creative process, and offer high-quality material ready
          to be integrated into any project. Browse our selection and discover
          new sounds for your compositions.
        </p>

        <p className="lg:pl-40 text-justify pt-4 italic text-neutral-500">
          Carefully crafted material, geared towards modern production and
          contemporary sound design.
        </p>
      </div>
      {sortedProducts.map((product: any) => (
        <div
          className="scroll-smooth"
          key={product.id}
          id={`product-${product.display_index}`}
        >
          <ProductComponent product={product as any} />
        </div>
      ))}
    </div>
  );
}
