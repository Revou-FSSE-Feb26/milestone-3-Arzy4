"use client";

import { Product, useCart } from "../context/cartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, removeFromCart, getCartItemQuantity } = useCart();

  const productInCart = getCartItemQuantity(product.id);

  const handleCartButton = () => {
    if (productInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
};

  return (
    <button
      onClick={handleCartButton}
      className={`mt-8 px-6 py-3 rounded-xl font-bold duration-300" ${
        productInCart          
        ? "bg-red-500 text-white hover:opacity-80"
          : "bg-orange-500 text-white hover:opacity-80"
      }`}
    >
      {productInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
}