"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/zustand/cartStorage";
import CartButton from "@/components/buttons/cartButton/cartButton";

import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";
const supabase = createBrowserSupabaseClient();

export default function ProductClient({ product }: { product: any }) {
  const { addItem } = useCartStore();
  const [user, setUser] = useState<any>(null);

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
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-black transition"
        >
          ← back
        </Link>

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
