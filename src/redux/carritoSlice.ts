import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

const initialState: Product[] = [];

const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    agregar: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.cantidad = action.payload.cantidad;
      } else {
        state.push({ ...action.payload });
      }
    },

    eliminar: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },

    limpiar: () => [],

    restaurar: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    }
  },
});

export const { agregar, eliminar, limpiar, restaurar } = carritoSlice.actions;

export default carritoSlice.reducer;