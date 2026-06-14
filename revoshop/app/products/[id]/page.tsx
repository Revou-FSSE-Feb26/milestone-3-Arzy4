import Image from "next/image";
import Navbar from "../../components/navbar";
import AddToCartButton from "../../components/addToCart";

type ProductDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default async function ProductDetail({
  params,
}: ProductDetailProps) {
  const { id } = await params;

  const response = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <main className="min-h-screen bg-zinc-800 text-white">
        <Navbar />

        <h1 className="p-8 text-4xl font-bold">
          Product Not Found
        </h1>
      </main>
    );
  }

  const product: FakeStoreProduct = await response.json();

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

          {/* Product Image */}
          <div className="bg-zinc-900 w-[500px] h-[500px] p-6 rounded-2xl">

            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-full rounded-xl object-contain"
            />

          </div>

          {/* Product Information */}
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
                    ${product.price.toLocaleString("id-ID")}
                </p>

                <AddToCartButton 
                product={cartProduct}
                />

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}