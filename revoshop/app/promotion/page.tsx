import Navbar from "../components/navbar";

export default function Promotion() {
  return (
    <main className="bg-zinc-800">

      <Navbar />

      <section className="p-8">
        <h1 className="text-4xl font-bold">
          Promotion Page
        </h1>

        <p className="mt-4">
          Special discounts available.
        </p>
      </section>
      
    </main>
  );
}