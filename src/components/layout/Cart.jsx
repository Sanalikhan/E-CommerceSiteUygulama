import { useSelector, useDispatch } from "react-redux";
import { showCart, deleteItem,increaseQuantity,decreaseQuantity } from "../../features/CartSlice";


export default function Cart(){
const dispatch = useDispatch();
const {items, isOpen} = useSelector((state)=> state.cart);

const totalPrice = items.reduce((total, item)=> total + item.price.min * item.quantity, 0);

    return (
        <>
        {isOpen && (
            <div
                onClick = {()=> dispatch(showCart(false))}
                className = "fixed inset-0 bg-black/40 z-20"/>
        )}

        <div className={`fixed top-0 right-0 h-full w-96 bg-white z-40 transform transition-transform duration-300 ${isOpen? "translate-x-0": "translate-x-full" }`}>
             <div className="p-6 flex flex-col h-full">

          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={() => dispatch(showCart(false))}>
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-6 flex-1 overflow-y-auto">

            {items.map(item => (
              <div key={item.id} className="flex gap-4">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg"
                />

                <div className="flex flex-col flex-1">

                  <p className="font-semibold">
                    {item.title}
                  </p>

                  <div className="flex gap-3 mt-2">

                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>

                  </div>

                  <p className="mt-2 font-bold">
                    $
                    {(item.price.min * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() =>
                      dispatch(deleteItem(item.id))
                    }
                    className="text-red-500 text-sm self-end bg-gray-200 px-3 py-1 font-semibold rounded-2xl hover:bg-red-600 hover:text-white"
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>


        </div>
        </div>
        </>
    );
}