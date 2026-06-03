import Navbar from "../components/navbar";

export default function Promotion() {
  const promotions = [
    {
      title: "New Customer Discount",
      description: "Get 20% off for your first purchase at Revoshop.",
      code: "WELCOME20",
    },
    {
      title: "Free Shipping",
      description: "Enjoy free shipping for orders above Rp 500.000.",
      code: "FREESHIP",
    },
    {
      title: "Weekend Sale",
      description: "Special weekend deals for selected furniture products.",
      code: "WEEKEND10",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <section className="max-w-6xl mx-auto py-16">
        <div className="text-center mb-14">
          <p className="text-orange-500 font-semibold mb-3">
            Special Offers
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Revoshop Promotions
          </h1>

          <p className="text-zinc-300 max-w-2xl mx-auto">
            Discover our latest discounts, limited-time deals, and special
            offers to make your shopping experience more affordable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {promotions.map((promo) => (
            <article
              key={promo.code}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:-translate-y-2 transition duration-300"
            >
              <div className="mb-5 inline-block rounded-full bg-orange-500/10 px-4 py-2 text-orange-400 font-semibold">
                {promo.code}
              </div>

              <h2 className="text-2xl font-bold mb-3">
                {promo.title}
              </h2>

              <p className="text-zinc-300 mb-6">
                {promo.description}
              </p>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition">
                Shop Now
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}