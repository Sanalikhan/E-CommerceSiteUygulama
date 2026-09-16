import { Products } from "../components/layout/sections/Products";
import Cart from "../components/layout/Cart";

export default function ProductsPage() {
  return (
    <>
      <div className="min-h-screen bg-white text-black px-5 py-10 sm:px-10 lg:px-20 xl:px-32">
        <section className="max-w-6xl mx-auto space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#FFA920] font-bold">Products</p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold">Industrial Storage & Safety Products</h1>
            <p className="mt-4 text-black leading-7">
              Browse our curated catalog of secure cabinets, storage lockers, safety cages, and material handling equipment. Each product is built to withstand industrial use and support safer, more efficient operations.
            </p>
          </div>
          <Products />
        </section>
      </div>
      <Cart />
    </>
  );
}
