import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helper/axiosinstance.js";
const initialState = {
    isloggedin: localStorage.getItem("isloggedin") || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || ""
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
        toast.error(error.message);
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
        toast.error(e.message);
    }
})


export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        let res = axiosInstance.post("user/logout");
        await toast.promise(res, {
            loading: "Loading",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        })

        res = await res;
        return res.data;
    }

    catch (e) {
        toast.error(e.message);
    }
})



export const getuser = createAsyncThunk("auth/getuser", async (data) => {
    try {
        let res = axiosInstance.post("user/me", data);
        await toast.promise(res, {
            loading: "Loading",
            success: (data) => {
                return data?.data.message;
            },
            error: "Failed to fetch your data"
        })
        res = await res;
        return res.data;
    }
    catch (e) {
        toast.error(e.message)
    }
    
})



export const changePassword=createAsyncThunk("auth/changepassword",async(userpassword)=>{
    try{
        let res=axiosInstance.post("user/change-password",userpassword);
        await toast.promise(res,{
            loading:"Loading",
            success:(data)=>{
                return data?.data.message;
            },
            error:"Failed to change password"
        })
        res = await res;
        return res.data;
    }
    catch(e){
        toast.error(e.message);
    }
})    



export const forgotPassword=createAsyncThunk("auth/forgotpassword",async(email)=>{
    try{
    let res= axiosInstance.post("user/reset-password",{email});
    await toast.promise(res,{
        loading:"Loading...",
        success:(data)=>{
            return data?.data?.message;
        },
        error:"Failed to forgot your password"
    })
    res=await res;
    return (await res).data;
    }
    catch(e){
        toast.error(e.message);
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // for login
        builder.addCase(signinAccount.fulfilled, (state, action) => {
            const user = action?.payload?.user;

            if (user) {
                localStorage.setItem("data", JSON.stringify(user));
                localStorage.setItem("isloggedin", JSON.stringify(true));
                localStorage.setItem("role", user.role);

                state.isloggedin = true;
                state.data = user;
                state.role = user.role;
            } else {
                console.error('User data is undefined');
            }
        });


        // for logout
        //   here is the state is the second storage of redux 
        builder.addCase(logout.fulfilled, (state, action) => {
            localStorage.clear();
            state.isloggedin = false;
            state.data = {};
            state.role = "";
        });

      
        
        //   for user data
        builder.addCase(getuser.fulfilled, (state, action) => {
            const user = action?.payload?.user;

            if (user) {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isloggedin", true);
                state.isloggedin = true;
                state.data = user;
                state.role=action?.payload?.user?.role;
            }
            else{
                toast.error("user is not exist");
            }
        })

          
   
    }
});


export default authSlice.reducer;