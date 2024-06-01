import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
screen
 )









}

export default CoursesList;