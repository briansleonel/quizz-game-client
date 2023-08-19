import { loadStateAuthLocalStorage } from "@/libs/state.localStorage";
import { IUserLogged } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface State {
    user: IUserLogged;
    isAuthenticated: boolean;
    errors: Array<string>;
}

const initialState: State = {
    user: loadStateAuthLocalStorage() || {
        _id: "",
        role: "",
        fullName: "",
        username: "",
    }, // Si se encuentra un usuario en localstorage se lo carga
    isAuthenticated: loadStateAuthLocalStorage() !== undefined, // Si hay un usuario en localstorage se indica que esta autenticado
    errors: [],
};

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, payload) => {
            state.isAuthenticated = true;
            state.user = payload.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = { _id: "", role: "", fullName: "", username: "" };
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
