import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import { useSelector } from "react-redux";

function CourseDescription() {
  const { coursedata } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { role, data } = useSelector((state) => state.auth);
  console.log(state);
  return (
    <div className="h-[80vh]  flex justify-center items-center align-middle bg-black">
      <div className="flex flex-row space-x-6">
        <div className="flex flex-col space-y-4">
          <div className="">
            <img
              className=""
              src={state?.message?.thumbnail?.secure_url}
              alt="thumbnail"
            />
          </div>
          <div>
            <div className=" font-bold flex justify-center text-[#EAB308] text-2xl">
              Total lectures:{" "}
              <span>{state?.message?.numbersOfLectures}</span>
              {/* <span className="text-white ml-2">{state?.message?.createdBy}</span> */}
            </div>
            <div className=" font-bold flex justify-center text-[#EAB308] text-2xl">
              Instructor:{" "}
              <span className="text-white ml-2">
                {state?.message?.createdBy}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-5">
              <h1 className="text-[#EAB308] text-4xl font-semibold">
                {state?.message?.title}
              </h1>
              <div className="text-[#EAB308] text-2xl font-semibold">
                Course description:
              </div>
            </div>

            <div className="text-white text-lg">
              {state?.message?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDescription;
