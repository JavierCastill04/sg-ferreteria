import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState { optimistic: boolean, prosecsCompra: boolean}

const initialState: ConfigState = { optimistic: false, prosecsCompra:false };

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        cambiarOptimistic: (state) => {
            state.optimistic = !state.optimistic;
        },
        ProsesandoComrpra:(state,action: PayloadAction<boolean>)=>{
            state.prosecsCompra = action.payload;
        }
    },
});

export const { cambiarOptimistic, ProsesandoComrpra } = configSlice.actions;
export default configSlice.reducer;