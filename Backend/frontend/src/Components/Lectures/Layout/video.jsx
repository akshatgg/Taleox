import { useNavigate,useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLectures } from "../../../Redux/Slices/LectureSlice";

function video(){
    const dispatch=useDispatch();
    const {id} =useParams();
    const navigate = useNavigate();
    const [lecture,setLecture]=useState([]);

    const {lecturedata}=useSelector((state)=>state.lecture);

    const loadvideo=async()=>{
        const result=await dispatch(getAllLectures(id));
        setLecture(result.payload);
    }


    useEffect(()=>{
      loadvideo();
      console.log(lecture);
      
    })
    return(
        <div>
             
        </div>
    )
}


export default video;