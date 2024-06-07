import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import { useSelector } from "react-redux";

function CourseDescription() {
  const { coursedata } = useSelector((state)=>state.course);
  const navigate = useNavigate;
  const { role, data } = useSelector((state) => state.auth);

  return (
    <div className="h-[100vh]  flex justify-center items-center align-middle bg-black">
      <div className="">
        <div className="">
          <img
            className=""
            src={coursedata?.thumbnail?.secure_url}
            alt="thumbnail"
          />
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default CourseDescription;
