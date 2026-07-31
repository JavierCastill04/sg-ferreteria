import { createSlice } from "@reduxjs/toolkit";

interface ConfigState { optimistic: boolean }

const initialState: ConfigState = { optimistic: false };

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        cambiarOptimistic: (state) => {
            state.optimistic = !state.optimistic;
        },
    },
});

export const { cambiarOptimistic } = configSlice.actions;
export default configSlice.reducer;