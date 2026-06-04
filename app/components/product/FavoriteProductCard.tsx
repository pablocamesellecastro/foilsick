"use client";
import Image from "next/image";
import { useCartStore } from "@/zustand/cartStorage";

export default function FavoriteProductCard({ product }: { product: any }) {
  const { items: items_carrito, addItem } = useCartStore();

  return (
    <div className="flex bg-neutral-100  ">
      <button>
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="object-cover rounded"
        />
      </button>

      <div className="flex flex-row justify-between w-full items-center p-5">
        <button className="text-lg font-medium">{product.name}</button>
        <a onClick={() => addItem(product)} href="#" className="items-center">
          Add to Cart
        </a>
      </div>
    </div>
  );
}
