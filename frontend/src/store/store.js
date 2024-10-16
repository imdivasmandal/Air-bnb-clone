import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice/index.js';

const store = configureStore({
    reducer: {
        auth : authSlice,
    }
});


export default store;