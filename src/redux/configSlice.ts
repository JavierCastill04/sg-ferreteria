import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
  optimistic: boolean;
  prosecsCompra: boolean;
  simulador: boolean;
}

const initialState: ConfigState = {
  optimistic: false,
  prosecsCompra: false,
  simulador: false,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    cambiarOptimistic: (state) => {
      state.optimistic = !state.optimistic;
    },
    ProsesandoComrpra: (state, action: PayloadAction<boolean>) => {
      state.prosecsCompra = action.payload;
    },
    SimuladorError: (state) => {
      state.simulador = !state.simulador;
    },
  },
});

export const { cambiarOptimistic, ProsesandoComrpra, SimuladorError } = configSlice.actions;
export default configSlice.reducer;