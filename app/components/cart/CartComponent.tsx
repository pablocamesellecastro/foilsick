"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/zustand/cartStorage";
import { Button } from "@/components/ui/button";
import { handleCheckout } from "@/lib/stripe/checkout";
import BackButton from "@/components/buttons/back-button/BackButton";

import { Divide, ShoppingBagIcon, SkullIcon } from "lucide-react";
// import Link from "next/link";
//import { product } from "@/mocks/products";
import { AlertDialog } from "@radix-ui/react-alert-dialog";

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
      <div className="w-full h-full flex flex-col space-y-4 p-4">
        <div className="flex justify-between">
          <BackButton />
        </div>

        <div className="w-full flex flex-col space-y-2 overflow-y-auto flex-1">
          <table className="w-full table-auto text-sm">
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
                      <Button
                        onClick={() => removeItem(i)}
                        className="text- black bg-transparent animation-none hover:bg-transparent hover:text-black"
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              <tr className="border-t">
                <td className="px-2 py-3">Total</td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3 text-right">{getTotal()}</td>
                <td className="px-2 py-3 flex justify-end"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {items_carrito && items_carrito.length === 0 ? (
          <span className="">Cart is empty</span>
        ) : (
          // <Button className="w-full" asChild>
          <button onClick={() => handleCheckout(Object.values(groupedItems))}>
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
