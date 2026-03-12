import { useDispatch } from "react-redux";
import { showCart } from "../../features/CartSlice";
export function Confirmation({ onClose }) {
    const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
      
      <div className="bg-white p-8 rounded-2xl w-96 relative shadow-xl">

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black text-xs p-1 rounded-full hover:bg-[#FFA920]"
        >
          ✕
        </button>

        <p className="text-lg font-semibold mb-6">
          The item has been successfully added to the cart.
        </p>

        <div className="flex gap-4 text-sm">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded-full w-1/2 hover:bg-[#FFA920]"
          >
            Continue Shopping
          </button>

          <button className="hover:bg-[#FFA920] text-black bg-gray-200 px-4 py-2 rounded-full w-1/2"
          onClick={()=> {
            dispatch(showCart(true));
            onClose();
            }}>
            Go to cart
          </button>
        </div>
      </div>

    </div>
  );
}