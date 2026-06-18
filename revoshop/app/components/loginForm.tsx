"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const [nextPath, setNextPath] = useState("/");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

      try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid Email or Password");
        return;
      }

      if (data.email === "robbyarzy@gmail.com") {
        setNextPath("/admin/products");
      } else {
        setNextPath(redirectPath);
      }

      setShowPopup(true);

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please check your API route.");
    } finally {
      setLoading(false);
    }
  }

  function closePopup() {
    setShowPopup(false);
    router.push(nextPath);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-80 duration-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
            <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
            <p className="text-gray-600 mb-4">
              You have successfully logged in.
            </p>

            <button
              onClick={closePopup}
              className="bg-black text-white px-5 py-2 rounded-lg hover:opacity-80 duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}