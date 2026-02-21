export default function ProductCard({ title, image, price, featured }) {
  return (
    <div className="bg-white rounded-2xl flex flex-col w-75 sm:w-70 lg:w-60 mb-16 font-nunito mt-5">

      {/* Image Section */}
      <div className="relative bg-[#f6f6f6] rounded-xl h-70 w-80 sm:w-60 mb-4 flex justify-center items-center">

        {/* Featured Badge */}
        {featured && (
          <span className="absolute top-3 left-3 bg-[#FFA920] text-white text-xs px-3 py-1 rounded-full">
            Featured
          </span>
        )}
<svg className="absolute top-3 right-3 w-6 h-6 bg-white p-1  rounded-full shadow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        {/* Product Image */}

        <img
          src={image}
          alt={title}
          className="h-50"
        />
      </div>

      {/* Title */}
      <h3 className="font-bold text-xl pb-7">
        {title}
      </h3>

      {/* Divider */}
      <div className="h-px bg-gray-300 mb-3 w-full"></div>

      {/* Price */}
      <div className="text-[#7a0d0d] font-extrabold pb-5 text-xl font-nunito">
        ${price.min.toFixed(2)} – ${price.max.toFixed(2)}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 lg:gap-1 px-1 lg:px-0">

        <button className="bg-[#FFA920] font-nunito text-gray-700 px-4 py-3 rounded-full text-sm font-medium w-[50%]">
          Add to Cart
        </button>

        <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-full text-sm w-[50%]">
          Select options
        </button>

      </div>
    </div>
  );
}
