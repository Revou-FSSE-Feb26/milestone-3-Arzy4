"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images?: string[];
  category?: {
    id: number;
    name: string;
  };
};

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getCartItemQuantity: (id: number) => number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const decreaseQuantity = useCallback((id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartItemQuantity = useCallback(
    (id: number) => {
      return cart.find((item) => item.id === id)?.quantity || 0;
    },
    [cart]
  );

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      getCartItemQuantity,
      totalPrice,
    }),
    [
      cart,
      addToCart,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      getCartItemQuantity,
      totalPrice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}