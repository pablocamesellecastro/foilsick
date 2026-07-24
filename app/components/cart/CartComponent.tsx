"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/zustand/cartStorage";
import { handleCheckout } from "@/lib/stripe/checkout";
import BackButton from "@/components/buttons/back-button/BackButton";

export default function CartComponent() {
  const {
    items: items_carrito,
    addItem,
    deleteCart,
    removeItem,
    getTotal,
    updateQuantity,
  } = useCartStore();

  //_________________________________________________________________

  const [isClient, setIsClient] = useState(false);

  //_________________________________________________________________

  const groupedItems = items_carrito?.reduce(
    (acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = { ...item, quantity: 0 };
      }
      acc[item.id].quantity += 1;
      return acc;
    },
    {} as Record<string, any>,
  );

  //_________________________________________________________________

  useEffect(() => {
    setIsClient(true);
  }, []);

  //_________________________________________________________________

  return (
    isClient && (
      <div className=" flex flex-col space-y-4">
        <div className="flex flex-col overflow-y-auto">
          <table className="w-full">
            <tbody>
              {groupedItems &&
                Object.values(groupedItems).map((i: any, index) => (
                  <tr key={"carrito_" + index} className="border-t">
                    <td className="px-2 py-3">
                      <a href={`/products/${i.id}`} className="">
                        {i.name}
                      </a>
                    </td>
                    <td>
                      <select
                        value={i.quantity}
                        onChange={(e) =>
                          updateQuantity(i.id, Number(e.target.value))
                        }
                        className="px-2 py-1 bg-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-3 text-right">{i.price}</td>
                    <td className="px-2 py-3 flex justify-end">
                      <span
                        onClick={() => removeItem(i)}
                        className="cursor-pointer hover:text-neutral-400 transition"
                      >
                        X
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex">
            <p className="px-2 py-3">Total</p>
            <p className="px-2 py-3">{getTotal()}</p>
          </div>
        </div>

        {items_carrito && items_carrito.length === 0 ? (
          <div className="flex align-items-left">
            <span className="p-2">Cart is empty</span>
          </div>
        ) : (
          // <Button className="w-full" asChild>
          <button
            className=""
            onClick={() => handleCheckout(Object.values(groupedItems))}
          >
            Proceed to checkout
          </button>
          // </Button>
        )}
        {/*
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          deleteCart();
        }}
      >
        kill cart
      </a>
      */}
      </div>
    )
  );
}
