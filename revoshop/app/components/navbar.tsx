import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-8">
        <Image 
        src="/revoShopLogo.png" 
        alt="Logo" 
        width={100} 
        height={50}
        />
        <div className="flex gap-6 text-white">
            <Link 
            href="/" 
            className="flex items-center gap-2 hover:text-orange-500 transition">
              Home
            </Link>

            <Link 
            href="/promotion" 
            className="flex items-center gap-2 hover:text-orange-500 transition">
              Promotion
            </Link>

            <Link 
            href="/faq" 
            className="flex items-center gap-2 hover:text-orange-500 transition">
              FAQ
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 hover:text-orange-500 transition"
            >
              <FaShoppingCart />
            </Link>
        </div>
    </nav>
  );
}