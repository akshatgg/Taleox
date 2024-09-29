import { useNavigate, useParams } from "react-router-dom";
import "./LectureCard.css";
import AOS from "aos";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLectures } from "../../Redux/Slices/LectureSlice";
import { IoSaveOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";
import { TbChartDots3 } from "react-icons/tb";

function LectureCard() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // Redux store data
  const { coursedata } = useSelector((state) => state.course);
  const { lecturedata, status, error } = useSelector((state) => state.lecture);

  const [lecture, setLecture] = useState([]);
  const [course, setCourse] = useState(null);

  // Fetch lectures and set local state
  const loadLectures = async () => {
    const result = await dispatch(getAllLectures(id));
    setLecture(result.payload); // Set fetched lectures
  };

  // Set course data based on selected course ID
  useEffect(() => {
    if (coursedata && id) {
      const selectedCourse = coursedata.find((course) => course._id === id);
      setCourse(selectedCourse || null);
    }
  }, [coursedata, id]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
    loadLectures(); // Fetch lectures
  }, [id]);

  // Render loading state
  if (status === 'loading') {
    return <div className="text-white">Loading lectures...</div>;
  }

  // Render error state
  if (status === 'failed') {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-[89vh] bg-black text-white overflow-hidden">
      <div className="flex flex-grow overflow-y-auto">
        {/* Left section: Course details */}
        <div className="w-3/10 m-5" data-aos="fade-right" data-aos-duration="1200">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-600">
            {course ? (
              <div>
                {/* Course Thumbnail */}
                <img
                  src={course?.thumbnail?.secure_url}
                  alt="Course Thumbnail"
                  className="w-full h-auto mb-6 rounded-lg transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl hover:blur-none blur-sm"
                />
                {/* Course Title and Description */}
                <h1 className="text-5xl font-bold mb-2 text-[#EAB308]">{course?.title}</h1>
                <h1 className="text-3xl mb-2 font-bold">(Complete Playlist)</h1>
                <p className="text-xl mb-2">Lecturer: <span>{course.createdBy}</span></p>
                <p className="text-xl mb-4">{course?.description}</p>

                {/* Icons with hover effects */}
                <div className="flex space-x-4 text-2xl text-center justify-center mb-6">
                  <div className="p-2 bg-white/20 rounded-full text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-500 hover:scale-110 transition duration-300 ease-in-out">
                    <IoSaveOutline />
                  </div>
                  <div className="p-2 bg-white/20 rounded-full text-white hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500 hover:scale-110 transition duration-300 ease-in-out">
                    <FaShare />
                  </div>
                  <div className="p-2 bg-white/20 rounded-full text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:scale-110 transition duration-300 ease-in-out">
                    <IoCloudDownloadOutline />
                  </div>
                  <div className="p-2 bg-white/20 rounded-full text-white hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500 hover:scale-110 transition duration-300 ease-in-out">
                    <TbChartDots3 />
                  </div>
                </div>

                {/* Play All and Shuffle Buttons */}
                <div className="flex space-x-4 justify-center">
                  <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition duration-300 ease-in-out">
                    Play All
                  </button>
                  <button className="px-6 py-2 bg-white/20 rounded-full text-white text-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 transform hover:scale-110 transition duration-300 ease-in-out">
                    Shuffle
                  </button>
                </div>
              </div>
            ) : (
              <p>No course found.</p>
            )}
          </div>
        </div>

        {/* Right section: Lecture list */}
        <div className="w-7/10 m-5 overflow-y-auto flex flex-col scrollbar-none">
  {Array.isArray(lecture) && lecture.length > 0 ? (
    lecture.map((lect) => (
      <div key={lect._id} className="flex items-start p-7 bg-gray-800 rounded-lg mb-2 hover:bg-gray-700 transition">
        {/* Thumbnail Image */}
        <img 
          src={lect.thumbnail.secure_url} 
          alt="Lecture Thumbnail" 
          className="w-full h-auto max-w-[300px] aspect-video object-contain mr-4 rounded-lg bg-black" // Adjust to rectangle shape without cropping
        />
        
        {/* Lecture Data */}
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-semibold">{lect.title}</h2>
          <p className="text-gray-400">{lect.description}</p>
        </div>
      </div>
    ))
  ) : (
    <p>No lectures available.</p>
  )}
</div>




      </div>
    </div>
  );
}

export default LectureCard;