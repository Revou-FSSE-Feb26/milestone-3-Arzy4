"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");

      const cart: Product[] = storedCart
        ? JSON.parse(storedCart)
        : [];

      const exists = cart.some(
        (item: Product) => item.id === product.id
      );

      setIsInCart(exists);

    } catch (error) {
      console.error("Failed to parse cart data:", error);

      localStorage.removeItem("cart");
      setIsInCart(false);
    }
  }, [product.id]);

  const handleCartButton = () => {
    try {
      const storedCart = localStorage.getItem("cart");

      const cart: Product[] = storedCart
        ? JSON.parse(storedCart)
        : [];

      if (isInCart) {
        const updatedCart = cart.filter(
          (item: Product) => item.id !== product.id
        );

        localStorage.setItem(
          "cart",
          JSON.stringify(updatedCart)
        );

        setIsInCart(false);

      } else {
        const updatedCart = [...cart, product];

        localStorage.setItem(
          "cart",
          JSON.stringify(updatedCart)
        );

        setIsInCart(true);
      }

    } catch (error) {
      console.error("Failed to update cart:", error);

      localStorage.removeItem("cart");
      setIsInCart(false);
    }
};

  return (
    <button
      onClick={handleCartButton}
      className={`mt-8 px-6 py-3 rounded-xl font-bold duration-300 ${
        isInCart
          ? "bg-red-500 hover:bg-red-600"
          : "bg-orange-500 hover:bg-orange-600"
      }`}
    >
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
}