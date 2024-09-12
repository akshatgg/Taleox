import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout.jsx";
import { useSelector } from "react-redux";
import { Button } from "react-scroll";

function CourseDescription() {
  // const { coursedata } = useSelector((state) => state.course);
  // const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log(state.message._id); 
  // const { role, data } = useSelector((state) => state.auth);
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
              Total lectures: <span>{state?.message?.numbersOfLectures}</span>
              {/* <span className="text-white ml-2">{state?.message?.createdBy}</span> */}
            </div>
            <div className=" font-bold flex justify-center text-[#EAB308] text-2xl">
              Instructor:{" "}
              <span className="text-white ml-2">
                {state?.message?.createdBy}
              </span>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            <Button className="bg-[#EAB308] pl-4 pr-4 text-xl pt-1 pb-1 hover:bg-[#f7c531ef]">
              Subscribe
            </Button>
             <Button className="bg-[#EAB308] pl-4 pr-4 text-lg pt-1 pb-1 hover:bg-[#f7c531ef]">
             <Link to={`/course/lecture/create/${state?.message?._id}`}>
  Add lectures
</Link>

             </Button>

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
            <div className="text-center flex justify-center">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDescription;
