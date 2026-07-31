import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

const initialState: Product[] = [];

const carritoSlice = createSlice({
<<<<<<< HEAD
  name: "carrito",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.find((item) => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.cantidad++;
      } else {
        state.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart } = carritoSlice.actions;
=======
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

>>>>>>> 116654d0c41acb8c43618139aeb7550cfd4752c2
export default carritoSlice.reducer;