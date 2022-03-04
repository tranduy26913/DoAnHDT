import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            user: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.user = action.payload
        },
        loginFalse: (state) => {
            state.login.error = true
        }

    }
})

export const {
    loginFalse,
    loginStart,
    loginSuccess
}=authSlice.actions

export default authSlice.reducer