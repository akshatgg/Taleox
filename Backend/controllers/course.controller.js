import apperror from "../utils/error.util.js";
import Course from "../models/course.model.js";
import cloudinary from 'cloudinary';
import fs from "fs/promises";


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

const createCourse=async (req,res,next)=>{
const {title, description, category, createdBy} =req.body;
if(!title && !description && !category && !createdBy){
    return next(new apperror("give every field",400))
}

   const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail:{
        public_id: 'dummy',
            
            
        
        secure_url: 'dummy',
         
    
     },
   });
   
   if(!course){
    return next(new apperror("Course could not created ,please try again",400));
   }

   if(req.file){
    const result= await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'LMS',
        width:250,
        height:250,
        gravity:'faces',
        crop:'fill'
    })
    if(result){
        course.thumbnail.public_id =result.public_id;
        course.thumbnail.secure_url=result.secure_url;
    }
    fs.rm(`uploads/${req.file.filename}`);

   }
await course.save();
res.status(200).json({
    success: true,
    message: "course created successfully",
    course,
});

}

const updateCourse=(req,res,next)=>{


}

const removeCourse=(req,res,next)=>{


}

export  {getAllCourses,getLecturesByCourseId,createCourse,updateCourse,removeCourse};