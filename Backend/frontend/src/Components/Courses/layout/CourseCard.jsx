import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="max-w-[22rem] h-auto overflow-hidden bg-white">
      <div>
        <img src="{data?.thumbnail?.secure_url}"
        className="max-w-[15rem] h-auto"
        alt="course-thumbnail"
        />
      </div>



      </div>
    </div>
  );
}

export default CourseCard;
