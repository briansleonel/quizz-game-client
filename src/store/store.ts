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

/*
// Cada vez que se actualice el estado de auth de usuario, lo guardaremos el localstorage
store.subscribe(function () {
    saveState(store.getState().auth.user);
});
*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
