import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import counterSlice from "./features/counter.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        counter: counterSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
