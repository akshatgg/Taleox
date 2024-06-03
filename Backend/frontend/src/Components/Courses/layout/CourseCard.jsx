import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-[20rem] ml-6">
      <div className="bg-[#383737] text-white">
        <div>
          <img
            src={data?.thumbnail?.secure_url}
            className="min-w-[20rem] h-auto"
            alt="course-thumbnail"
          />
        </div>
        <h1 className="font-bold mt-2 flex items-center justify-center text-3xl text-[#EAB308]">{data?.title}</h1>
        <br />
        <div>
          <p>
            {" "}
            <span className="text-xl font-medium text-[#EAB308] ml-2">
              Category:
            </span>
            <span> {data?.category}</span>
          </p>
        </div>
        <div>
          <p>
            <span className="text-xl font-medium text-[#EAB308] ml-2">
              Description:
            </span>
            <span> {data?.description}</span>
          </p>
        </div>
        <div>
          <span className="text-xl font-medium text-[#EAB308] ml-2">
            Total lectures:
          </span>
        </div>
        <p>
          <span className="text-xl font-medium text-[#EAB308] ml-2">Instructor:</span> <span> {data?.createdBy}</span>
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
