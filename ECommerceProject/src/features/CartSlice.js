import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    items: [],
    isOpen: false,
    totalAmount : 0
}
const CartSlice = createSlice({
    name : 'Cart',
    initialState,
    reducers: {
        showCart : (state, action) =>{
            state.isOpen = action.payload;
        },
        addItem : (state, action) =>{
            const existingItem = state.items.find(
                (item)=> item.id ===action.payload.id
            );
            if (existingItem){
                existingItem.quantity +=1;
            }
            else{
                state.items.push({
                    ...action.payload,
                    quantity: 1
                });
            }
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter((item) =>
            item.id !== action.payload);
        },
        increaseQuantity : (state,action) =>{
            const item = state.items.find(
                (item) => item.id === action.payload
            );
            if (item){
                item.quantity += 1;
            }
        },
        decreaseQuantity : (state,action) =>{
            const item = state.items.find(
                (item) => item.id === action.payload
            );
            if (item && item.quantity > 1){
                item.quantity -=1;
            }
        }

    }
});

export const {
    showCart,
    addItem,
    deleteItem,
    increaseQuantity,
    decreaseQuantity
} = CartSlice.actions;

export default CartSlice.reducer;
