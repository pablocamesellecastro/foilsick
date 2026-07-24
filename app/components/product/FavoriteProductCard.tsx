"use client";
import Image from "next/image";
import { useCartStore } from "@/zustand/cartStorage";

export default function FavoriteProductCard({ product }: { product: any }) {
  const { items: items_carrito, addItem } = useCartStore();

  return (
    <div className="flex">
      <a href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={70}
          height={70}
          className="object-cover"
        />
      </a>

      <div className="flex flex-row justify-between w-full items-center pl-5 pt-5 pb-5 ">
        <a href={`/products/${product.id}`} className="">
          {product.name}
        </a>
        <a onClick={() => addItem(product)} href="#" className="items-center">
          Add to Cart
        </a>
      </div>
    </div>
  );
}
