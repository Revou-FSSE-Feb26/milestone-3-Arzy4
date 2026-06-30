"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/navbar";
import { useCart } from "../context/cartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const handleCheckoutSuccess = () => {
      if (cart.length === 0) return;
      clearCart();
      setShowCheckoutSuccess(true);
    };

  return (
    <main className="min-h-screen bg-zinc-800 text-white">
      <Navbar />

      <section className="p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>

        <table className="w-full border border-zinc-600 table-fixed">
            <thead className="bg-zinc-900">
                <tr>
                <th className="p-4 text-center w-[25%]">Product</th>
                <th className="p-4 text-center w-[25%]">Category</th>
                <th className="p-4 text-center w-[25%]">Price</th>
                <th className="p-4 text-center w-[25%]">Action</th>
                </tr>
            </thead>

            <tbody>
                {cart.map((item) => (
                <tr key={item.id} className="border-t border-zinc-600">
                    <td className="p-4 text-center w-[25%]">{item.title}</td>

                    <td className="p-4 text-center w-[25%]">{item.category?.name || "No category"}</td>

                    <td className="p-4 text-center w-[25%]">
                    ${item.price}
                    </td>

                    <td className="p-4 text-center w-[25%]">
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                    >
                        Remove
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        
        <div className="flex justify-between">

          <h2 className="text-2xl font-bold mt-6">
            Total: ${totalPrice}
          </h2>

          {cart.length > 0 && (
            <button
              onClick={handleCheckoutSuccess}
              className="mt-8 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-bold duration-300"
            >
              Checkout
            </button>
          )}

        </div>

        {showCheckoutSuccess && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Checkout Successful!
              </h2>

              <p className="text-zinc-300 mb-6">
                Thank you for shopping at REVOSHOP. Your products have been successfully checked out.
              </p>

              <Link
                href="/"
                className="inline-block bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-bold duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}