import Link from "next/link";
import RegisterForm from "../components/registerForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-800 px-4">
      <section className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        <RegisterForm />

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}