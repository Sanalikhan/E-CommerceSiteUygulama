import { Link } from 'react-router-dom';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-white px-5 py-10 sm:px-10 lg:px-20 xl:px-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#FFA920] font-bold">
            <Link to="/" className="text-white hover:text-[#FFD18F]">Home</Link>
            <span>/</span>
            Services
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Services for Secure Facilities and Smarter Storage</h1>
          <p className="text-gray-300 leading-7 max-w-3xl">
            Our services are designed to support planning, product selection, installation coordination, and long-term safety across industrial workspaces.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-4xl border border-white/10 bg-[#1f1d33] p-8 shadow-xl shadow-black/20">
            <h2 className="text-xl font-semibold text-white">Site Assessment</h2>
            <p className="mt-4 text-gray-300 leading-7">
              We evaluate your workspace layout and safety needs to recommend the best storage and security systems.
            </p>
          </div>
          <div className="rounded-4xl  border border-white/10 bg-[#1f1d33] p-8 shadow-xl shadow-black/20">
            <h2 className="text-xl font-semibold text-white">Custom Engineering</h2>
            <p className="mt-4 text-gray-300 leading-7">
              Engineering support helps you choose reinforced products, cage configurations, and access controls that meet compliance requirements.
            </p>
          </div>
          <div className="rounded-4xl  border border-white/10 bg-[#1f1d33] p-8 shadow-xl shadow-black/20">
            <h2 className="text-xl font-semibold text-white">Installation Guidance</h2>
            <p className="mt-4 text-gray-300 leading-7">
              We provide expert guidance for installation and layout to ensure your equipment performs as expected from day one.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-4xl  border border-white/10 bg-[#1f1d33] p-8 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Ongoing Support</h2>
          <p className="mt-4 text-gray-300 leading-7">
            We partner with you beyond purchase through spare part sourcing, product updates, and responsive customer service for any facility changes.
          </p>
          <ul className="mt-6 space-y-3 text-gray-300">
            <li>• Safety reviews and product recommendations</li>
            <li>• Maintenance and refurbishment planning</li>
            <li>• Project coordination with site teams</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
