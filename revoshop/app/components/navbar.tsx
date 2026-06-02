import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-8">
        <Image src="/revoShopLogo.png" alt="Logo" width={100} height={50} />
        <div className="flex gap-6 text-white">
            <Link href="/">Home</Link>
            <Link href="/promotion">Promotion</Link>
            <Link href="/faq">FAQ</Link>
        </div>
    </nav>
  );
}