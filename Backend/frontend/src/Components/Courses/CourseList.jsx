import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "./layout/CourseCard";
   
  const CourseList = () => {
  const dispatch = useDispatch();
  const { coursedata } = useSelector((state) => state.course);
  console.log(coursedata);
  const loadedCourses = async () => {
  await dispatch(getAllCourses());
  };
  
  
  useEffect(() => {
  loadedCourses();
  }, []);
  
  
  return (
    <div className="bg-black">
      <div className="flex flex-wrap gap-28">
        {coursedata?.map((element) => {
          return <CourseCard key={element._id} data={element} />;
        })}
      </div>
      <br />
      <br />

      <br />  
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseList;
