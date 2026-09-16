export default function FaqsPage() {
  const faqs = [
    { q: 'How do I place an order?', a: 'Browse products, add them to cart, then checkout.' },
    { q: 'What payment methods do you accept?', a: 'We accept major credit cards and bank transfers.' },
    { q: 'How can I contact support?', a: 'Use the Contact Us page or call our support number.' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 text-gray-800">
      <h2 className="mb-6 text-3xl font-bold text-white">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-md bg-white/5 p-4">
            <h3 className="font-semibold text-white">{f.q}</h3>
            <p className="mt-1 text-sm text-gray-200">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
