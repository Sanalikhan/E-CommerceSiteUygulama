export default function FaqsPage() {
  const faqs = [
    {
      q: 'How do I place an order?',
      a: 'Browse our product catalog, select the items you need, and add them to your cart. When you\'re ready, proceed to checkout where you can review your order, provide shipping information, and complete your purchase securely.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and bank transfers. For large orders, we also offer purchase orders and net payment terms for qualified business customers.'
    },
    {
      q: 'Do you offer customized solutions for specific industrial needs?',
      a: 'Yes! We specialize in customized industrial storage solutions. Our team can work with you to design and configure partitions, cages, and storage systems that meet your specific space, security, and operational requirements. Contact us to discuss your project.'
    },
    {
      q: 'What is your shipping and delivery process?',
      a: 'We ship nationwide with delivery times typically ranging from 5-10 business days depending on your location and product availability. Large or custom orders may require freight shipping. Once your order ships, you\'ll receive tracking information via email.'
    },
    {
      q: 'What is your return and warranty policy?',
      a: 'We offer a 30-day return policy on standard products in original condition. All our industrial storage products come with a manufacturer\'s warranty covering defects in materials and workmanship. Custom-configured products may have different terms - please contact us for details.'
    },
    {
      q: 'How can I contact customer support?',
      a: 'You can reach our customer support team through the Contact Us page on our website, call us at 800-922-6120, or use the WhatsApp chat feature. Our team is available Monday-Friday, 8 AM - 6 PM EST to assist with product selection, orders, and technical questions.'
    },
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
