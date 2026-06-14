"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/navbar";
import AddToCartButton from "../../components/addToCart";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Product Not Found");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-800 text-white">
        <Navbar />
        <h1 className="p-8 text-4xl font-bold text-center">Loading product...</h1>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-zinc-800 text-white">
        <Navbar />
        <h1 className="p-8 text-4xl font-bold">Product Not Found</h1>
      </main>
    );
  }

  const cartProduct = {
    id: product.id,
    name: product.title,
    category: product.category,
    price: product.price,
    image: product.image,
    description: product.description,
  };

  return (
    <main className="min-h-screen bg-zinc-800 text-white">
      <Navbar />

      <section className="p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-zinc-900 w-[500px] h-[500px] p-6 rounded-2xl flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div>
            <p className="text-orange-400 font-semibold">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {product.title}
            </h1>

            <p className="text-zinc-300 text-justify leading-relaxed mt-6">
              {product.description}
            </p>

            <div className="flex justify-between items-center">
              <p className="text-2xl text-orange-400 font-bold mt-4">
                ${product.price}
              </p>

              <AddToCartButton product={cartProduct} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}