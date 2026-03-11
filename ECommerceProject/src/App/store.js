import catalogReducer from '../features/CatalogSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer:{
        catalog: catalogReducer,

    }
});