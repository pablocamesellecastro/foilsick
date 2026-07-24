"use client";
import CartButton from "../components/buttons/cartButton/cartButton";
import Image from "next/image";

export default function SidebarFoilsick({ products }) {
  const handleScrollTo = (displayIndex: number) => {
    const section = document.querySelector(
      `#product-${displayIndex}`,
    ) as HTMLElement | null;

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const formatIndex = (n: number) => `...${n.toString().padStart(3, "0")}`;

  const sortedProducts = [...products].sort(
    (a, b) => Number(a.display_index) - Number(b.display_index),
  );

  return (
    <aside className="w-full lg:w-72 bg-neutral-000 flex flex-col lg:sticky lg:top-0 lg:h-screen p-4 gap-4">
      <div className="flex lg:w-8 lg:flex-col gap-2 overflow-x-auto lg:overflow-visible whitespace-nowrap hover:cursor-pointer text-neutral-800">
        <a
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left hover:text-neutral-400 transition"
        >
          ...000
        </a>

        {sortedProducts.map((product) => (
          <a
            key={product.id}
            onClick={() => handleScrollTo(product.display_index)}
            className="text-left hover:text-neutral-400 transition hover:cursor-pointer"
          >
            {formatIndex(product.display_index)}
          </a>
        ))}
      </div>
      <div className=" mt-auto flex lg:w-8 lg:flex-row gap-2 overflow-x-auto lg:overflow-visible whitespace-nowrap ">
        <p className=" flex text-neutral-400 text-center italic font-light text-s cursor-default ">
          © 2026 Foilsick. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
