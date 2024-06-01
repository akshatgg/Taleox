import { useEffect } from "react";
import { UseDispatch,useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";



 const CoursesList=()=>{
 const dispatch=useDispatch();
 const {coursedata}=useSelector((state)=> state.course);
 
 useEffect(()=>{
    (async()=>{
        await dispatch(getAllCourses());
    })
 },[] );

 return(

 )









}

export default CoursesList;