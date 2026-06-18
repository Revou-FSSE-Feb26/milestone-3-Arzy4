"use client"

import { useState, useEffect} from "react";
import Navbar from "./components/navbar";
import ProductCard from "./components/productCard";

type platziProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
};

export default function Home() {
  const [products, setProducts] = useState<platziProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
     });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-800 text-white">
        <Navbar />
        <h1 className="p-8 text-4xl font-bold text-center">
          Loading products...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-800 text-white">
        <Navbar />
        <h1 className="p-8 text-4xl font-bold text-center">
          {error}
        </h1>
      </main>
    );
  }

  return (
    <main className="bg-zinc-800 text-white">

      <Navbar />

      {/* Product Listing */}
      <section className="p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          RevoShop Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6 p-12">

          {products.map((product) => {
            const productImage =
              product.images?.[0]?.startsWith("https://")
                ? product.images[0]
                : "/placeholder.png";

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={productImage}
                title={product.title}
                category={product.category.name}
                description={product.description}
                price={product.price}
              />
            );
          })}

        </div>

      </section>

    </main>
  );
}
