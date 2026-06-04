"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/zustand/cartStorage";
import CartButton from "@/components/buttons/cartButton/cartButton";
import BackButton from "@/components/buttons/back-button/BackButton";
import { useFavorite } from "@/components/hooks/useFavorite";

import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";
const supabase = createBrowserSupabaseClient();

export default function ProductClient({ product }: { product: any }) {
  const { addItem } = useCartStore();
  const [user, setUser] = useState<any>(null);
  const { favoriteIcon, loaded, handleFavorite } = useFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //@ts-ignore
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createBrowserSupabaseClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto text-black">
      <div className="flex flex-row justify-between items-center">
        <BackButton />
        <CartButton />
      </div>

      <div className="grid lg:grid-cols-2 gap-14 mt-8">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <p className="text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-10">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">{product.price} EUR</p>

              <button
                className="flex items-center gap-1"
                onClick={() => handleFavorite()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={loaded && favoriteIcon === "filled" ? "black" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </button>

              <button
                onClick={handleAddToCart}
                className="px-6 py-3  hover:text-neutral-400 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
