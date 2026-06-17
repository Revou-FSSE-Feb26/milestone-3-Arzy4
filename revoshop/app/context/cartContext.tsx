"use client";

import {createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: Product) {
    setCart((prevCart) => {
      const alreadyExists = prevCart.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return prevCart;
      }

      return [...prevCart, product];
    });
  }

  function removeFromCart(id: number) {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  function isInCart(id: number) {
    return cart.some((item) => item.id === id);
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}