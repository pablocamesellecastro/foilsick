"use client";
import { useCartStore } from "@/zustand/cartStorage";
import { useEffect, useState } from "react";

export default function CartButton() {
  const { getCount } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <a
      href="/cart"
      className="hover:text-neutral-400 transition flex flex-row "
    >
      <span className="">Cart</span>
      {isClient && <span>{`(${getCount()})`}</span>}
    </a>
  );
}
