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
        return next(new apperror("Did not find any courses", 400));
      }
  
      const lectureData = {
        title,
        description,
        thumbnail: {
          public_id: 'dummy',
          secure_url: 'dummy',
        },
        lecture: {},
      };
  
      // If a file is uploaded, process the Cloudinary upload
      if (req.file) {
        try {
          console.log("File details:", req.file); // Debug: log file details
  
          // Use absolute path to avoid issues
          const filePath = path.resolve(req.file.path);
  
          // Upload the thumbnail (image) to Cloudinary
          const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: 'LMS',
            transformation: [{ width: 250, height: 250, gravity: 'faces', crop: 'fill' }],
          });
  
          console.log("Cloudinary upload result:", result); // Debug: log Cloudinary result
  
          // If the file was uploaded to Cloudinary successfully
          if (result) {
            lectureData.thumbnail = {
              public_id: result.public_id,
              secure_url: result.secure_url,
            };
  
            // Remove the file from server after uploading to Cloudinary
            await fs.rm(req.file.path);
          }
        } catch (e) {
          console.error("Error uploading to Cloudinary:", e.message); // Debug: log Cloudinary errors
          return next(new apperror(`Cloudinary error: ${e.message}`, 500));
        }
      } else {
        console.error("No file was uploaded.");
        return next(new apperror("No file uploaded", 400)); // Handle case where no file is present
      }
  
      // Add the lecture data to the course
      course.lectures.push(lectureData);
      course.numbersOfLectures = course.lectures.length;
  
      // Save the updated course
      await course.save();
  
      // Send response
      res.status(200).json({
        success: true,
        message: "Lectures uploaded successfully",
        course,
      });
    } catch (e) {
      console.error("Error adding lecture:", e.message); // Debug: log general errors
      return next(new apperror(`Server error: ${e.message}`, 500));
    }
  };







// Remove Lecture Function
const removeLecture = async (req, res, next) => {
  console.log("Params: ", req.params);  // Log params for debugging

  try {
    // Extract courseId and lectureId from the route parameters
    const { courseId, lectureId } = req.params; 

    // Validate if courseId and lectureId are provided
    if (!courseId) {
      return next(new apperror('Course ID is required', 400));
    }

    if (!lectureId) {
      return next(new apperror('Lecture ID is required', 400));
    }

    // Find the course by courseId
    const course = await Course.findById(courseId);

    if (!course) {
      return next(new apperror('Invalid Course ID or Course does not exist.', 404));
    }

    // Find the lecture index using the lectureId
    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );

    if (lectureIndex === -1) {
      return next(new apperror('Lecture does not exist.', 404));
    }

    // Check if the lecture has a valid Cloudinary public_id and delete it
    const lectureToDelete = course.lectures[lectureIndex]?.lecture;

    if (lectureToDelete?.public_id) {
      try {
        // Delete the lecture video from Cloudinary
        await cloudinary.v2.uploader.destroy(lectureToDelete.public_id, {
          resource_type: 'video',
        });
      } catch (cloudinaryError) {
        return next(new apperror('Error removing the video from Cloudinary.', 500));
      }
    }

    // Remove the lecture from the course's lectures array
    course.lectures.splice(lectureIndex, 1);

    // Update the number of lectures
    course.numbersOfLectures = course.lectures.length;

    // Save the updated course
    await course.save();

    // Return a success response
    res.status(200).json({
      success: true,
      message: 'Course lecture removed successfully',
    });

  } catch (error) {
    console.error("Error: ", error); // Log unexpected errors for debugging
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