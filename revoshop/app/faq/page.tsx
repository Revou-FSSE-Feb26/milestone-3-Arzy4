import Navbar from "../components/navbar";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, open the product detail page, and click the Add to Cart button.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "We currently support bank transfer, e-wallet, and credit card payments.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping usually takes around 2-5 business days depending on your location.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes, products can be returned within 7 days if they meet our return policy requirements.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our support team through email or live chat available on the website.",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <section className="max-w-4xl mx-auto py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-orange-500 font-semibold mb-3">
            Need Help?
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>

          <p className="text-zinc-300 max-w-2xl mx-auto">
            Find answers to common questions about shopping,
            payments, shipping, and customer support at Revoshop.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:border-orange-500 transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">
                {faq.question}
              </h2>

              <p className="text-zinc-300 leading-relaxed">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}