import { loginRequest } from "@/services/user.service";
import { createSlice } from "@reduxjs/toolkit";

interface State {
    user: any;
    isAuthenticated: boolean;
    errors: Array<string>;
}

const initialState: State = {
    user: null,
    isAuthenticated: false,
    errors: [],
};

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, payload) => {
            console.log(payload.payload);
            loginRequest(payload.payload)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        },
        logout: (state, payload) => {
            console.log(payload);
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
