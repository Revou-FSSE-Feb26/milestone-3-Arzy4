import Image from "next/image";
import Navbar from "./components/navbar";
import ProductCard from "./components/productCard";
import { products } from "./data/products";

export default function Home() {
  return (
    <main className="bg-zinc-800 text-white">

      <Navbar />

      {/* Product Listing */}
      <section className="p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          RevoShop Products
        </h1>

        <div className="grid grid-cols-3 justify-items-center gap-6 p-12">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              category={product.category}
              description={product.description}
              price={product.price}
            />
          ))}

        </div>

      </section>

    </main>
  );
}
