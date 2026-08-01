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
    ProcesandoCompra: (state, action: PayloadAction<boolean>) => {
      state.prosecsCompra = action.payload;
    },
    SimuladorError: (state) => {
      state.simulador = !state.simulador;
    },
  },
});

export const { cambiarOptimistic, ProcesandoCompra, SimuladorError } = configSlice.actions;
export default configSlice.reducer;