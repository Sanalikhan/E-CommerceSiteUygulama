import catalogReducer from '../features/CatalogSlice';
import {configureStore} from '@reduxjs/toolkit';
import cartSliceReducer from '../features/CartSlice';
import authReducer from '../features/AuthSlice';

export const store = configureStore({
    reducer:{
        catalog: catalogReducer,
        cart : cartSliceReducer,
        auth: authReducer,
    }
});