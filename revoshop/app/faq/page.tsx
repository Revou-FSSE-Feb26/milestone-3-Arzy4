import Navbar from "../components/navbar";

export default function FAQ() {
  return (
    <main className="bg-zinc-800">
      <Navbar />

      <section className="p-8">
        <h1 className="text-4xl font-bold">
          FAQ Page
        </h1>

        <p className="mt-4">
          Frequently Asked Questions.
        </p>
      </section>
    </main>
  );
}