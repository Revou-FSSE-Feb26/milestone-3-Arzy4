import Link from "next/link";
import LoginForm from "../components/loginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-800 px-4">
      <section className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <LoginForm />

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}