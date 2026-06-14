"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    const storedUsers = localStorage.getItem("users")
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const emailAlreadyExists = users.some(
        (user: { email: string }) => user.email === email
    );

    if (emailAlreadyExists) {
        alert("Email already registered.");
        return;
    }

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
    router.push("/login");
  }

  return (
    <>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

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
            placeholder="Create password"
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
          Register
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
            <h2 className="text-xl font-bold mb-2">Register Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your account has been successfully registered.
            </p>

            <button
              onClick={closePopup}
              className="bg-black text-white px-5 py-2 rounded-lg hover:opacity-80 duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}