import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "./layout/CourseCard";



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
<div className="max-w-[200vh]">

  <div className="flex flex-wrap gap-14">
  {coursedata ?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}


  </div>

</div>
    
 )
}

export default CourseList;