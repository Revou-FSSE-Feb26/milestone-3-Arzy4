import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductCard({
  id,
  title,
  price,
  category,
  image,
}: ProductCardProps) {
  return (
  <div className="flex flex-col justify-between border rounded-xl p-5 shadow-md hover:shadow-xl duration-300 bg-zinc-900 w-[250px] h-[420px] text-white">

    {/* Image Container */}
    <div className="rounded-lg h-[220px] flex items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="object-contain h-full w-full p-4"
      />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 mt-4">

      <h2 className="text-lg font-bold line-clamp-2 min-h-[56px] text-justify">
        {title}
      </h2>

      <p className="text-sm text-zinc-400 mt-2">
        {category}
      </p>

      <div className="mt-auto flex justify-between items-center">
        <p className="text-lg font-semibold">
          ${price}
        </p>

        <Link href={`/products/${id}`}>
          <button className="bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-lg cursor-pointer">
            View Details
          </button>
        </Link>
      </div>

    </div>

  </div>
);
}