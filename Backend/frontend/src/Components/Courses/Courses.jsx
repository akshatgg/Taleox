// import {createSlice} from "@reduxjs/toolkit"
function Courses(){
    const initialState={
        courseData: []
    }
    // const courseSlice=createSlice({
    // name:"courses",
    // initialState,
    // reducers:{},
    // extraReducers:(builder) => {
    
    // }
    // })


    const response= await Axios.get(
        "http://localhost:5000/api/auth/user/",

    )
    return(
        <>
        
        






        
        </>
    )
}
export default Courses