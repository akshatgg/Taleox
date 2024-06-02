import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="overflow-hidden bg-white">
        <div>
          <img
            src={data?.thumbnail?.secure_url}
            className="min-w-[20rem] h-auto"
            alt="course-thumbnail"
          />
        </div>
        <h1>{data?.title}</h1>
        <div>
          <p>
            {" "}
            Category:<span>{data?.category}</span>
          </p>
        </div>
        <div>
          <p>
            Description: <span>{data?.description}</span>
          </p>
        </div>
        <div>Total lectures:</div>
        <p>
          Instructor: <span>{data?.createdBy}</span>
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
