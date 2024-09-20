import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AOS from "aos";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLectures } from "../../Redux/Slices/LectureSlice";

function LectureCard(){
    const dispatch = useDispatch();
    const { id: id } = useParams();
    
    const { lecturedata } = useSelector((state) => state.lecture);
    const loadlecture=async()=>{
        await dispatch(getAllLectures(id));
    }
    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
        loadlecture()
        console.log(lecturedata);
    }, [id]);

    return(
        <div className="h-[100vh] bg-black">
          <div className="flex">
  <div className="w-3/10 m-11">
  <div className="bg-gray-600">
    {/* <img src={} /> */}  
      
  </div>
  </div>
  <div className="w-7/10">
   
  </div>
</div>

               
        </div>
    )
}


export default LectureCard;