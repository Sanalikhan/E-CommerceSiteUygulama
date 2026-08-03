import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Banner() {
  const banner = useSelector((state) => state.catalog.banner);
  const bannerTitle = banner.title;
  const [part1] = bannerTitle.split(" Cages");

  return (
    <div className="flex-col px-5 bg-[rgb(256,252,250)] sm:flex sm:flex-row sm:items-center sm:p-4 md:p-10 pb-10 sm:pb-23 lg:p-16 lg:gap-4">
      <div className="font-nunito font-bold text-gray-500">
        <div className="mb-5 flex flex-wrap gap-3 text-xs sm:text-sm">
          <Link to="/about" className="rounded-full border border-[#650404] bg-white px-4 py-2 text-[#650404] transition hover:bg-[#650404] hover:text-white">
            About Us
          </Link>
          <Link to="/contact" className="rounded-full border border-[#650404] bg-white px-4 py-2 text-[#650404] transition hover:bg-[#650404] hover:text-white">
            Contact Us
          </Link>
          <Link to="/products" className="rounded-full border border-[#650404] bg-white px-4 py-2 text-[#650404] transition hover:bg-[#650404] hover:text-white">
            Products
          </Link>
        </div>

        <h3 className="text-[#FFA920] font-nunitoSans text-xs sm:text-sm md:text-base pb-1 sm:pb-3 md:pb-4 tracking-wider mt-7">
          PRODUCTS / PARTITION AND CAGES
        </h3>
        <h1 className="text-black text-3xl sm:text-5xl md:text-5xl mb-1 sm:mb-7 font-nunitoSans font-extrabold">
          {part1}
          <span className="text-[#650404]"> Cages</span>
        </h1>
        <p className="pb-3.5 md:text-base text-base">{banner.description1}</p>
        <p className="pb-4 hidden sm:block text-xs sm:text-base">{banner.description2}</p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-full bg-[#FFA920] px-6 py-3 text-sm sm:text-base font-medium text-white shadow-[0_5px_10px_rgba(149,146,140,0.5)] transition hover:bg-[#ffb549]"
        >
          View All Products
        </Link>
      </div>
      <img className="w-70 h-50 sm:w-50 sm:h-50 md:w-80 md:h-80 lg:w-[60%]" src={banner.image} alt="Partition and Cages Image" />
    </div>
  );
}