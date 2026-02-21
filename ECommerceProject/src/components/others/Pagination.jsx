import backArrow from '../../assets/backarrow.png'
import arrow from '../../assets/Arrow.png'
export default function Pagination() {
  return (
    <div className="flex items-center justify-center gap-1 mb-22 font-nunito text-sm">

      {/* Left Arrow */}
      <img src={backArrow} className="m-2 w-5 h-5 flex items-center justify-center text-gray-600 hover:bg-gray-100"/>

      {/* Page 1 (active) */}
      <button className="p-3 w-4 h-4 flex items-center justify-center rounded-md bg-[#FFA920] text-gray-700 font-semibold">
        1
      </button>

      {/* Page 2 */}
      <button className="p-3 w-4 h-4 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
        2
      </button>

      {/* Page 3 */}
      <button className="p-3 w-4 h-4 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
        3
      </button>

      {/* Dots */}
      <span className="px-2 p-3 text-gray-500">...</span>

      {/* Last page */}
      <button className="p-3 w-4 h-4 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
        12
      </button>

      {/* Right Arrow */}
      <img src={arrow} className="m-2 w-5 h-5 flex items-center justify-center text-gray-600 hover:bg-gray-100"/>
    </div>
  );
}
