"use client";

import Image from "next/image";
import { useCartStore } from "@/zustand/cartStorage";
import { useFavorite } from "@/components/hooks/useFavorite";
import { MdCircle, MdOutlineCircle } from "react-icons/md";

export default function ProductClient({ product }: { product: any }) {
  const { addItem } = useCartStore();
  const { isFavorite, loaded, handleFavorite } = useFavorite(product.id);

  const handleAddToCart = () => {
    //@ts-ignore
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
    });
  };

  return (
    <section className="mx-auto max-w-[960px] px-6 pt-12 pb-32 text-black">
      <div className="grid gap-10 lg:grid-cols-[4fr_5fr] lg:gap-24">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between gap-6">
          <h1 className="text-base font-bold">{product.name}</h1>

          <p className="whitespace-pre-line text-xs italic leading-snug text-neutral-500">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">{product.price} EUR</p>

            <div className="flex items-center gap-4">
              {loaded && (
                <button
                  onClick={handleFavorite}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  {isFavorite ? <MdCircle /> : <MdOutlineCircle />}
                </button>
              )}

              <button
                onClick={handleAddToCart}
                className="text-xs transition hover:text-neutral-400"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
