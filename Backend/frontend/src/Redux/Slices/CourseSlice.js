import { createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helper/axiosinstance"


const initialState={
coursedata:[]   
    

}

const courseslice=createSlice({
    name:'course',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})


export default courseslice.reducer;