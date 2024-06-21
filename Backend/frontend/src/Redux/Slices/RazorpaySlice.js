import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helper/axiosinstance"
import toast from "react-hot-toast";

const initialState={
    key:"",
    subscription:"",
    isPayments:{},
    isPaymentVerified:false,
    finalMonths:{},
    monthlySalesRecord:[]
}


export const getrazorpayId=createAsyncThunk("razorpay/payment-key",async()=>{
    try{
       let res = await axiosInstance.get("Payment/payment-key");
       return res.data;
    }
    catch(e){
       toast.error("Failed to load data");
    }
})


export const purchaseBundle =createAsyncThunk("/purchaseCourse",async()=>{
    try{
      let res= await axiosInstance.post("Payment/suscribe");
      return res.data;
    }
    catch(e){
     toast.error(e?.response?.data?.message);
    }
})








const razorpaySlice= createSlice({
    name:'razorpay',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
    builder
    .addCase(getrazorpayId.rejected, ()=>{
        toast.error("Failed to load the data")
    })
    .addCase(getrazorpayId.fulfilled,   (state,action)=>{
      state.key=action?.payload?.key    
    })

    .addCase(purchaseBundle.fulfilled,(state,action)=>{

        state.subscription_id= action?.payload?.subscription_id;
    })
    }
})