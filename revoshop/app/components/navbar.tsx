"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

type CurrentUser = {
  name: string;
  email: string;
};

export default function Navbar() {
  const router = useRouter();

  const [showDropDown, setShowDropDown] = useState(false);

  const [currentUser, setCurrentUser] =
    useState<CurrentUser | null>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("currentUser");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    localStorage.removeItem("currentUser");

    setCurrentUser(null);

    router.push("/login");
  }

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-8 gap-5">
      <Image
        src="/revoShopLogo.png"
        alt="Logo"
        width={100}
        height={50}
      />

      <div className="flex flex-wrap justify-center gap-6 text-white">
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-orange-500 transition"
        >
          Home
        </Link>

        <Link
          href="/promotion"
          className="flex items-center gap-2 hover:text-orange-500 transition"
        >
          Promotion
        </Link>

        <Link
          href="/faq"
          className="flex items-center gap-2 hover:text-orange-500 transition"
        >
          FAQ
        </Link>

        <Link
          href="/cart"
          className="flex items-center gap-2 hover:text-orange-500 transition"
        >
          <FaShoppingCart />
        </Link>

        {currentUser ? (
          <div className="relative">
            <button
              onClick={() =>
                setShowDropDown(!showDropDown)
              }
              className="font-semibold text-orange-500 hover:text-orange-400 transition"
            >
              {currentUser.email} ▼
            </button>

            {showDropDown && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-32 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-2 text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="hover:text-orange-500 transition"
          >
            Login
          </Link>
        )}
        </div>
    </nav>
  );
}