import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

const initialState: Product[] = [];

const carritoSlice = createSlice({
    name: "carrito",

    initialState,

    reducers: {
        agregar: (
            state,
            action: PayloadAction<Product>
        ) => {
            const existingProduct = state.find(
                item => item.id === action.payload.id
            );

            if (existingProduct) {
                existingProduct.cantidad++;
            } else {
                state.push({
                    ...action.payload
                });
            }
        },

        eliminar: (
            state,
            action: PayloadAction<number>
        ) => {
            return state.filter(
                item => item.id !== action.payload
            );
        },

        limpiar: () => [],
    },
});

export const { agregar, eliminar, limpiar } = carritoSlice.actions;

export default carritoSlice.reducer;