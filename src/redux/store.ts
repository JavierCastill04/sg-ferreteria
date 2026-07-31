import { configureStore } from "@reduxjs/toolkit";
import carritoReducer from "@/redux/carritoSlice";
import configReducer from "@/redux/configSlice"

export const store = configureStore({
    reducer: {
        carrito: carritoReducer,
        config: configReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;