import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 0,
};

// Creamos el slice
export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            state.counter -= 1;
        },
    },
});

// Exportamos sus actions
export const { increment, decrement } = counterSlice.actions;

// Le decimos a la Store que tenemos este slice
export default counterSlice.reducer;
