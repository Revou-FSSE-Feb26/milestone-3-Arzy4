"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();

  const [showDropDown, setShowDropDown] = useState(false);

  const [currentUser, setCurrentUser] = useState<{
    email: string;
    name?: string;
  } | null>(null);

  useEffect(() => {
    async function fetchCurrentUser() {
    const response = await fetch("/api/auth/profile", {
      credentials: "include",
    });

    if (!response.ok) {
      setCurrentUser(null);
      return;
    }

    const data = await response.json();
    setCurrentUser(data);
  }

  fetchCurrentUser();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setCurrentUser(null);
    setShowDropDown(false);

    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-8 gap-5">
      <Image
        src="/revoShopLogo.png"
        alt="Logo"
        width={100}
        height={50}
      />

      <div className=" flex absolute left-1/2 -translate-x-1/2 gap-6 text-white">
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
      </div>

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
              {currentUser.email === "robbyarzy@gmail.com" && (
              <Link
                href="/admin/products"
                className="block w-full text-center px-4 py-2 text-blue-500 hover:bg-blue-50 transition"
              >
                Admin
              </Link>
            )}
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
    </nav>
  );
}