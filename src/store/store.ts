import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import counterSlice from "./features/counter.slice";
import filtersSlice from "./features/filters.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        counter: counterSlice,
        fitlers: filtersSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
