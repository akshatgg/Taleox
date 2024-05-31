import { createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helper/axiosinstance"
import { toast } from "react-hot-toast";

const initialState={
coursedata:[]   
}

export const getAllCourses= createAsyncThunk("/course/getallcourses",async()=>{
    try{

    }
    catch(e){
        toast.error(e.message);
    }
})


const courseslice=createSlice({
    name:'course',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      
    }
})


export default courseslice.reducer;