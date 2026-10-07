import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const submitOrder = createAsyncThunk(
  'cart/submitOrder',
  async (items, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const baseUrl = import.meta.env.VITE_API_URL ?? '/api';
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ items }),
      });

      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error || data.message || 'Failed to submit order');
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to submit order');
    }
  }
);

const initialState = {
  items: [],
  isOpen: false,
  orderStatus: 'idle',
  orderError: null,
  orderResponse: null,
};

const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    showCart: (state, action) => {
      state.isOpen = action.payload;
    },
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.orderStatus = 'idle';
      state.orderError = null;
      state.orderResponse = null;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.orderStatus = 'idle';
      state.orderError = null;
      state.orderResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.orderStatus = 'loading';
        state.orderError = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.orderResponse = action.payload;
        state.items = [];
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.orderError = action.payload || 'Unable to submit order';
      });
  },
});

export const {
  showCart,
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
