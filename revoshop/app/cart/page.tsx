"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-zinc-800 text-white">
      <Navbar />

      <section className="p-8">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

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
                    <td className="p-4 text-center w-[25%]">{item.name}</td>

                    <td className="p-4 text-center w-[25%]">{item.category}</td>

                    <td className="p-4 text-center w-[25%]">
                    Rp {item.price.toLocaleString("id-ID")}
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

        <h2 className="text-2xl font-bold mt-6">
          Total: Rp {total.toLocaleString("id-ID")}
        </h2>
      </section>
    </main>
  );
}