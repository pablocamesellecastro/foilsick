"use server";
import CartComponent from "../components/cart/CartComponent";

export default async function Page() {
  return (
    <div className="min-h-screen bg-neutral-0 text-black">
      <div className="mx-auto max-w-4xl p-6">
        <CartComponent />
      </div>
    </div>
  );
}
