import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../Helper/axiosinstance"
import { toast } from "react-hot-toast";

const initialState = {
    coursedata: []
}


//access to get all courses

export const getAllCourses = createAsyncThunk("/course/getallcourses", async () => {
    try {
        const res = axiosInstance.get("courses/")
        toast.promise(res, {
            loading: "Loading",
            success: "Coures loaded successfully",
            error: "Failed to get course"
        })
        const response = await res;
        return response.data.courses;
    }
    catch (e) {
        toast.error(e.message);
    }
})


// access to create a new course

export const createcourse = createAsyncThunk("get/courses",async (data)=>{
    try{
const res=axiosInstance.post("/courses/",data);
toast.promise(res,{
    loading:"Loading",
    success:(data)=>{
        return data?.data?.message;
    },
    error:"Failed to create course"
})
const response=await res;
return response.data;
    }
    catch(e){
        toast.error(e.message)
    }

})

const courseslice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllCourses.fulfilled,(state,action)=>{
        if(action.payload){
            console.log(action.payload);
            state.coursedata = [...action.payload]
        }
      })
    }
})

// export const {} =courseslice.actions;
export default courseslice.reducer;