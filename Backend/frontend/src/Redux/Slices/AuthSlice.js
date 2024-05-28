import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helper/axiosinstance.js";
const initialState = {
    isloggedin: localStorage.getItem("isloggedin") || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) :{}
};

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
    try {
        let res = axiosInstance.post("user/register", data);
        await toast.promise(res, {
            loading: "Loading",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create an account",
        })

        res = await res;
        return res.data;
    }

    catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const signinAccount = createAsyncThunk("auth/signin", async (data) => {
    try {
        let res = axiosInstance.post("user/login", data);
       toast.promise(res, {
            loading: "Loading",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        })
        res = await res;
        return await (res).data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
    }
})



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signinAccount.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isloggedin", true);
            localStorage.setItem("role", action?.payload?.user?.role);

            state.isloggedin = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        });
    },
});


export default authSlice.reducer;