import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import { useSelector } from "react-redux";

function CourseDescription() {
  const { coursedata } = useSelector((state)=>state.course);
  const navigate = useNavigate();
  const location=useLocation();
  const {state}=location;
  const { role, data } = useSelector((state) => state.auth);
console.log(state);
  return (
    <div className="h-[100vh]  flex justify-center items-center align-middle bg-black">
      <div className="">
        <div className="">
          <img
            className=""
            src={state?.message?.thumbnail?.secure_url}
            alt="thumbnail"
          />
        </div>
        <h1 className="text-white">{state?.title}</h1>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default CourseDescription;
