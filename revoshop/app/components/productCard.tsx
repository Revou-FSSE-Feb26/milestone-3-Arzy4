import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  description,
  category,
  image,
}: ProductCardProps) {
  return (
    <div className="flex flex-col justify-center gap-6 border rounded-xl p-5 shadow-md hover:shadow-xl duration-300 bg-zinc-900 w-[400px] shrink-0 text-white">

      <Image 
      src={image} 
      alt={name} 
      width={400} 
      height={300} 
      className="rounded-lg" 
      />

      <div>

        <h2 className="text-2xl font-bold">
          {name}
        </h2>

        <p className="text-sm mt-2">
          {category}
        </p>

        <p className="mt-3 text-justify">
          {description}
        </p>

        <div className="flex justify-between">

          <p className="text-lg mt-2">
            Rp {price.toLocaleString("id-ID")}
          </p>

          <Link href={`/products/${id}`}>
            <button className="bg-orange-500 hover:bg-orange-600 p-2 rounded-lg cursor-pointer">
              View Details
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}