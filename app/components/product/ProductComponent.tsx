"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useCartStore } from "@/zustand/cartStorage";
import { useFavorite } from "@/components/hooks/useFavorite";

export default function ProductComponent({ product }: { product: any }) {
  const { items: items_carrito, addItem } = useCartStore();
  const { favoriteIcon, loaded, handleFavorite } = useFavorite(product.id);

  return (
    <div className="flex flex-row lg:gap-32 py-10">
      <div className="hidden lg:flex items-start w-8">
        <h1 className="text-lg text-grey font-light text-neutral-700">
          {product.display_index.toString().padStart(2, "0")}.
        </h1>
      </div>

      <main className="flex flex-col gap-3 flex-1">
        <h1 className="text-xl uppercase text-neutral-800">{product.name}</h1>

        <div className="flex flex-col gap-4">
          <Card className="flex items-center justify-center aspect-square">
            <a href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="object-contain"
              />
            </a>
          </Card>
        </div>

        <div className="flex flex-row justify-between gap-10">
          <p className="text-sm text-neutral-600">{product.description}</p>
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
        </div>

        <div className=" space-y-3 justify-between flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-neutral-800">
              {product.price} EUR
            </span>
            <a
              onClick={() => addItem(product)}
              href="#"
              className="text-neutral-800"
            >
              Add to Cart
            </a>
          </div>
          <div className="justify-between text-sm text-neutral-400 grid grid-cols-2 gap-y-2">
            <span>Size:</span>{" "}
            <span className="italic text-right">{product.size}</span>
            <span>Genre:</span>{" "}
            <span className="italic text-right">{product.genre}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
