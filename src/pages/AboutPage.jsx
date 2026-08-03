import Header from "../components/layout/sections/Header";
import Footer from "../components/layout/sections/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#090b10] text-white">
      <div className="px-5 py-10 sm:px-10 lg:px-20 xl:px-32">
        <section className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#FFA920] font-bold">About Custom Equipment Co.</p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-white">Reliable Industrial Storage and Safety Solutions</h1>
            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-7">
              Custom Equipment Co. delivers engineered material handling systems, secure storage, and protective barriers for warehouses, manufacturing facilities, logistics centers and more. Our product range includes storage cabinets, safety cages, bollards, barrier gates and customized solutions designed to improve safety, organization, and operational efficiency.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-[#1f1d33] rounded-3xl p-8 shadow-xl shadow-black/20">
              <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
              <p className="mt-4 text-gray-300 leading-7">
                We help businesses protect people, inventory and equipment through durable industrial solutions that are built to perform in demanding environments. Every design is focused on safety, accessibility, and long-term reliability.
              </p>
              <ul className="mt-6 space-y-3 text-gray-300">
                <li>• Secure storage for tools, parts and sensitive inventory</li>
                <li>• Space-saving solutions for lean facilities</li>
                <li>• Custom engineering for your exact workflow</li>
              </ul>
            </div>

            <div className="bg-[#1f1d33] rounded-3xl p-8 shadow-xl shadow-black/20">
              <h2 className="text-2xl font-semibold text-white">Why Customers Choose Us</h2>
              <p className="mt-4 text-gray-300 leading-7">
                Our customers trust us for products that combine structural strength with thoughtful design. We deliver equipment that supports smarter inventory control, reduces theft, and keeps workers safe while enabling faster material handling operations.
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-white">Expertise</h3>
                  <p className="text-gray-300 leading-6">Decades of experience in industrial storage, fencing, and safety barriers.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Quality</h3>
                  <p className="text-gray-300 leading-6">Premium materials and manufacturing standards for long service life.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Support</h3>
                  <p className="text-gray-300 leading-6">Fast service, consultation, and responsive order support for every project.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="bg-[#151520] rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white">What We Offer</h2>
              <p className="mt-4 text-gray-300 leading-7">
                From heavy-duty lockers to industrial cages, we provide ready-to-install products and custom configurations that fit your facility layout. Our range is ideal for security, process separation, and organized material storage.
              </p>
              <ul className="mt-6 space-y-3 text-gray-300">
                <li>• Secure tool & parts cabinets</li>
                <li>• Wire mesh storage cages</li>
                <li>• Bollards, gates, and safety barriers</li>
                <li>• Custom partitions and containment systems</li>
              </ul>
            </div>

            <div className="bg-[#151520] rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white">Our Process</h2>
              <p className="mt-4 text-gray-300 leading-7">
                We work closely with your team to identify needs, recommend the right equipment, and deliver solutions that fit your space and budget. Every project begins with a consultation, followed by design, fabrication and reliable delivery.
              </p>
              <div className="mt-6 space-y-4 text-gray-300 leading-7">
                <div>
                  <span className="font-semibold text-white">Consultation</span> to understand your storage and security needs.
                </div>
                <div>
                  <span className="font-semibold text-white">Configuration</span> of products for your exact workflow.
                </div>
                <div>
                  <span className="font-semibold text-white">Delivery</span> and ongoing support after installation.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
