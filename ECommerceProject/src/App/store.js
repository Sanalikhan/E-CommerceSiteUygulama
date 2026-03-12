import catalogReducer from '../features/CatalogSlice';
import {configureStore} from '@reduxjs/toolkit';
import cartSliceReducer from '../features/CartSlice';
export const store = configureStore({
    reducer:{
        catalog: catalogReducer,
        cart : cartSliceReducer
    }
});