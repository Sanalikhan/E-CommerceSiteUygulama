import { Link } from 'react-router-dom';

export default function CustomizedSolutionsPage() {
  return (
    <div className="min-h-screen bg-white text-black px-5 py-10 sm:px-10 lg:px-20 xl:px-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#FFA920] font-bold">
            <Link to="/" className="text-black hover:text-[#FFA920]">Home</Link>
            <span>/</span>
            Customized Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Tailored Industrial Storage and Security Designs</h1>
          <p className="text-black leading-7 max-w-3xl">
            Our customized solutions combine product expertise and engineering support to build storage systems, partitions, cages, and safety barriers that fit your exact space and process requirements.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border border-gray-200 bg-gray-50 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-black">Design for Your Facility</h2>
            <p className="mt-4 text-black leading-7">
              We start with a full review of your warehouse, plant or service area. Then we design customized partitions, lockers and access solutions that improve flow, reduce clutter, and secure high-value items.
            </p>
            <ul className="mt-6 space-y-3 text-black">
              <li>• Custom-sized mesh cages and secure storage rooms</li>
              <li>• Engineered lockers and tool control systems</li>
              <li>• Specialty compartments for safety equipment and parts</li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-gray-200 bg-gray-50 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-black">Flexible Implementation</h2>
            <p className="mt-4 text-black leading-7">
              Whether you need a single secure room or a full material handling solution, we tailor fabrication, finish and layout to your operational and budget goals.
            </p>
            <ul className="mt-6 space-y-3 text-black">
              <li>• Modular systems for easy expansion</li>
              <li>• Reinforced structures for heavy-duty use</li>
              <li>• Custom color and branding options</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-[32px] border border-gray-200 bg-gray-50 p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-black">How We Work with You</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 border border-gray-200">
              <h3 className="font-semibold text-black">1. Consultation</h3>
              <p className="mt-3 text-black leading-7">
                We review your layout, security needs and material flow to recommend the right products and placement.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-gray-200">
              <h3 className="font-semibold text-black">2. Custom Design</h3>
              <p className="mt-3 text-black leading-7">
                Our team creates a tailored solution with the right storage, safety, and separation products for your environment.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-gray-200">
              <h3 className="font-semibold text-black">3. Fabrication</h3>
              <p className="mt-3 text-black leading-7">
                Products are manufactured with industrial-grade materials and precise fit for your space.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-gray-200">
              <h3 className="font-semibold text-black">4. Delivery & Support</h3>
              <p className="mt-3 text-black leading-7">
                We deliver on schedule and remain available for installation guidance and follow-up support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
