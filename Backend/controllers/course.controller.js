import apperror from "../utils/error.util.js";
import Course from "../models/course.model.js";


const getAllCourses=async(req,res,next)=>{

    try{
        const courses=await Course.find({}).select('-lectures');
        
        res.status(200).json({
            success:true,
            message:"All courses",
            courses,
        });
    }

    catch(e){
        return next(new apperror(e.message,500));
    }
 



}

const getLecturesByCourseId=async(req,res,next)=>{
try{
const {id}=req.params;
console.log(id);
const course=await Course.findById(id);
if(!course){
    return next(new apperror("course id is invalid" ,400));
}
console.log(course);

res.status(200).json({
    success:true,
    message:"Courses lectures fetched success",
    lectures: course.lectures
});
}
catch(e){
    return next(new apperror(e.message,500));
}


}

const createCourse=(req,res,next)=>{
const {title, description, category, createdBy} =req.body;
if(!title && !description && !category && !createdBy){
    return next(new apperror("give every field",400))
}
    
}

const updateCourse=(req,res,next)=>{


}

const removeCourse=(req,res,next)=>{


}

export  {getAllCourses,getLecturesByCourseId,createCourse,updateCourse,removeCourse};