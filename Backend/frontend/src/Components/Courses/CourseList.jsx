import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";



 const CourseList=()=>{
 const dispatch=useDispatch();
 const {coursedata}=useSelector((state)=> state.course);
 

 const loadedCourses=async()=>{
  await dispatch(getAllCourses());
 }

 useEffect(()=>{
   loadedCourses();
         
  
 },[] );

 return(
<div></div>
    
 )
}

export default CourseList;