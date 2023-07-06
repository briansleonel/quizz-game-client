import { IUserLogged } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface State {
    user: IUserLogged;
    isAuthenticated: boolean;
    errors: Array<string>;
}

const initialState: State = {
    user: { _id: "", role: "" },
    isAuthenticated: false,
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
        logout: (state, payload) => {
            console.log(payload);
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
