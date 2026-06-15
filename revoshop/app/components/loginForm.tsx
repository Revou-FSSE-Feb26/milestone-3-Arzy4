"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const storedUser = localStorage.getItem("users");

    if (!storedUser) {
      alert("User not found. Please register first.");
      return;
    }

    const users = JSON.parse(storedUser);

    const foundUser = users.find(
    (user: { email: string; password: string }) =>
      user.email === email &&
      user.password === password
    );

    if (foundUser) {
        document.cookie = "token=logged-in; path=/";
        localStorage.setItem(
        "currentUser",
        JSON.stringify(foundUser)
      );
        setShowPopup(true);
    } else {
        alert("Invalid email or password.");
    }
    }

  function closePopup() {
    setShowPopup(false);
    router.push(redirectPath);
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
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-80 duration-300"
        >
          Login
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