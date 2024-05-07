import apperror from "../utils/error.util.js";
import Course from "../models/course.model.js";




const getAllCourses=async(req,res,next)=>{

    try{
        const courses=await Course.find({}).select('-lectures');
        
        res.status(200).json({
            success:true,
            message:"All courses",
            courses,
        })
    }

    catch(e){
        return next(new apperror(e.message,500));
    }
 



}

const getLecturesByCourseId=async(req,res,next)=>{

}

export  {getAllCourses,getLecturesByCourseId};