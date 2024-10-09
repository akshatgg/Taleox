import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "./layout/CourseCard";
import { Audio } from 'react-loader-spinner'; // Add the loader component

const CourseList = () => {
    const dispatch = useDispatch();
    const { coursedata } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(true); // Initialize loading as true

    const loadedCourses = async () => {
        setLoading(true); // Start loading
        await dispatch(getAllCourses());
        setLoading(false); // End loading after fetching courses
    };

    useEffect(() => {
        loadedCourses();
    }, []);

    return (
        <div className="bg-black">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Audio
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="audio-loading"
                    />
                </div>
            ) : (
                <div className="flex flex-wrap gap-28">
                    {coursedata?.map((element) => {
                        return <CourseCard key={element._id} data={element} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default CourseList;
