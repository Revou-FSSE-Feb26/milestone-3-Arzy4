import Image from "next/image";
import Navbar from "../../components/navbar";
import { products } from "../../data/products";
import AddToCartButton from "../../components/addToCart";

type ProductDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetail({
  params,
}: ProductDetailProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-zinc-800 text-white">
        <Navbar />

        <h1 className="p-8 text-4xl font-bold">
          Product Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-800 text-white">

      <Navbar />

      <section className="p-8">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Product Image */}
          <div className="bg-zinc-900 p-6 rounded-2xl">

            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full rounded-xl object-cover"
            />

          </div>

          {/* Product Information */}
          <div>

            <p className="text-orange-400 font-semibold">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {product.name}
            </h1>

            <p className="text-zinc-300 text-justify leading-relaxed mt-6">
              {product.description}
            </p>

            <div className="flex justify-between items-center">

                <p className="text-2xl text-orange-400 font-bold mt-4">
                    Rp {product.price.toLocaleString("id-ID")}
                </p>

                <AddToCartButton 
                product={product}
                />

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}