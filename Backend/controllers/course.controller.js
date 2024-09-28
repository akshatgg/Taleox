import apperror from "../utils/error.util.js";
import Course from "../models/course.model.js";
import cloudinary from 'cloudinary';
import fs from "fs/promises";
import mongoose from 'mongoose';
import { type } from "os";

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





const updateCourse=async(req,res,next)=>{
try{
      const {id}=req.params;

       const course= await Course.findByIdAndUpdate(
        id,
        {
            $set: req.body
        },
        {
            runValidators:true
        }
       )

if(!course){
    return next(new apperror(e.message,500));
}

res.status(200).json({
    success: true,
    message: "course updated successfully",
    course,
});

}
   catch(e){
        return next(new apperror(e.message,500));
    }
}

const removeCourse=async(req,res,next)=>{
    try{
       const {id}=req.params;
       const course= await Course.findById(id);

       if(!course){
        return next(new apperror(e.message,500));
    }


    await course.deleteOne();
    res.status(200).json({
        success: true,
        message: "course deleted successfully",
        course,
    });
       
    }
    catch(e){
        return next(new apperror(e.message,500));
    }  

}




// Controller for adding lectures to a course


const addLecturesToCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    // Find the course by ID
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Create the lecture object
    const lectureData = {
      title,
      description,
      thumbnail: {
        public_id: 'dummy',
        secure_url: 'dummy',
      },
      video: {
        public_id: 'dummy',
        secure_url: 'dummy',
      },
    };

    console.log('Lecture data:', lectureData);

    // Add the lecture data to the course's lectures array
    course.lectures.push(lectureData);

    // Check if both thumbnail and video files are present in req.files
    if (req.files && req.files.thumbnail && req.files.thumbnail[0] && req.files.video && req.files.video[0]) {
      const thumbnailFile = req.files.thumbnail[0];
      const videoFile = req.files.video[0];
      console.log('Thumbnail file:', thumbnailFile, 'Video file:', videoFile);

      try {
        // Cloudinary upload options for the thumbnail
        const uploadOptions = {
          folder: 'LMS/Lectures/Image',
          transformation: [{ width: 250, height: 250, gravity: 'faces', crop: 'fill' }],
        };

        // Cloudinary upload options for the video
        const uploadVideoOptions = {
          folder: "LMS/Lectures/Video",
          resource_type: "video", // Ensure Cloudinary treats it as a video
        };

        // Upload thumbnail to Cloudinary
        const thumbnailUploadResult = await cloudinary.v2.uploader.upload(thumbnailFile.path, uploadOptions);
        const videoUploadResult = await cloudinary.v2.uploader.upload(videoFile.path, uploadVideoOptions);

        // Update thumbnail and video information after successful upload
        const lastLecture = course.lectures[course.lectures.length - 1];
        lastLecture.thumbnail = {
          public_id: thumbnailUploadResult.public_id,
          secure_url: thumbnailUploadResult.secure_url,
        };
        lastLecture.video = {
          public_id: videoUploadResult.public_id,
          secure_url: videoUploadResult.secure_url,
        };

        console.log('Updated last lecture with thumbnail and video:', lastLecture);

        // Remove the uploaded files from the server
        await fs.unlink(thumbnailFile.path);
        await fs.unlink(videoFile.path);
        
      } catch (uploadError) {
        console.error("Error uploading files to Cloudinary:", uploadError);
        return next(new Error(`File upload failed: ${uploadError.message}`));
      }
    } else {
      console.log('No thumbnail or video file uploaded');
    }

    // Update the number of lectures in the course
    course.numbersOfLectures = course.lectures.length;

    // Save the updated course
    await course.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Lecture added successfully",
      course,
    });

  } catch (e) {
    console.error("Error adding lecture:", e.message);
    return res.status(500).json({ success: false, message: `Server error: ${e.message}` });
  }
};








export default addLecturesToCourse;









// Remove Lecture Function

const removeLecture = async (req, res, next) => {
  console.log("Params: ", req.params);  // Log params for debugging

  try {
    const { courseId, lectureId } = req.params;

    // Validate IDs
    if (!courseId || !lectureId) {
      return next(new apperror('Both Course ID and Lecture ID are required', 400));
    }

    // Check if the provided IDs are valid MongoDB ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return next(new apperror('Invalid Course ID format.', 400));
    }

    if (!mongoose.Types.ObjectId.isValid(lectureId)) {
      return next(new apperror('Invalid Lecture ID format.', 400));
    }

    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new apperror('Invalid Course ID or Course does not exist.', 404));
    }

    // Find the index of the lecture to be deleted
    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );

    if (lectureIndex === -1) {
      return next(new apperror('Lecture does not exist.', 404));
    }

    // Retrieve the lecture to be deleted
    const { lecture } = course.lectures[lectureIndex];

    // Check if the lecture has a valid Cloudinary public_id and delete it
    if (lecture?.public_id) {
      try {
        await cloudinary.v2.uploader.destroy(lecture.public_id, {
          resource_type: 'video',
        });
      } catch (cloudinaryError) {
        console.error("Cloudinary Error:", cloudinaryError);
        return next(new apperror('Error removing the video from Cloudinary.', 500));
      }
    }

    // Remove the lecture from the course's lectures array
    course.lectures.splice(lectureIndex, 1);

    // Update the number of lectures
    course.numbersOfLectures = course.lectures.length;

    // Validate remaining lectures to ensure they have required fields
    const invalidLectures = course.lectures.filter(
      (lecture) => !lecture.title || !lecture.description
    );

    if (invalidLectures.length > 0) {
      return next(new apperror('All remaining lectures must have a title and description.', 400));
    }

    // Save the updated course  
    await course.save();

    // Return a success response
    res.status(200).json({
      success: true,
      message: 'Course lecture removed successfully',
    });

  } catch (error) {
    console.error("Error occurred while removing the lecture:", error);
    return next(new apperror('An error occurred while removing the lecture.', 500));
  }
};



  
  



export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLecturesToCourse,
    removeLecture
};