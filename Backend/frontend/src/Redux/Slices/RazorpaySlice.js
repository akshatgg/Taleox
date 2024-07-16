import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helper/axiosinstance"
import toast from "react-hot-toast";
import { verifySubscription } from "../../../../controllers/payment.controller";

const initialState={
    key:"",
    subscription_id:"",
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


export const verifyuserPayment=createAsyncThunk("payment/verify",async(paymentDetail)=>{
try{
  let res=await axiosInstance.post("Payment/verify",{
  razorpay_payment_id: paymentDetail.razorpay_payment_id,
  razorpay_subscription_id: paymentDetail.razorpay_subscription_id,
  razorpay_signature: paymentDetail.razorpay_signature
})
  return res.await;
}
catch(e){
toast.error(e?.response?.data?.message);
}
})


export const getallPayment=createAsyncThunk("paymentrecord",async()=>{
    try{
  let res=await axiosInstance.get("/Payment");
  toast.promise(res, {
    loading: "Getting the payments record...",
    success: (data) => {
      return data?.data?.message;
    },
    error: "Failed to get payment records",
  });

  const response=await res;
  return response.data
}
    catch(e){
        toast.error("Did not fetch the data")
    }

})




export const cancelSubscribtion=createAsyncThunk(".unsubscribe",async()=>{
    try{
   const res=axiosInstance.post("Payment/unsubscribe",)
   toast.promise(res, {
    loading: "Unsubscribing the bundle...",
    success: "Bundle unsubscibed successfully",
    error: "Failed to unsubscibe the bundle",
  });
  const response = await res;
  return response.data;
    }
    catch(e){
        toast.error(error?.response?.data?.message);
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
        state.subscription_id = action?.payload?.subscription_id;
    })

    .addCase(verifySubscription.fulfilled,(state,action)=>{
      state.isPaymentVerified= action?.payload?.success
    })

    .addCase(verifyuserPayment.rejected,(state,action)=>{
      toast.error(action?.payload?.message);
      state.isPaymentVerified = action?.payload?.success;
    })

    
    .addCase(getallPayment.fulfilled,(state,action)=>{
      state.isPayments=action?.payload?.getallPayment;
      state.finalMonths=action?.payload?.finalMonths;
      state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
    })



    }
})