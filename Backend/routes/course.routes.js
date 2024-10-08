import { Router } from 'express'; 
import { createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse ,addLecturesToCourse,removeLecture } from '../controllers/course.controller.js';
import { isloggedIn,authorizedRoles,authorizedSubscriber} from "../middleware/auth.middleware.js";
import upload from '../middleware/multer.middleware.js';

const router = Router();


router.route('/')
.get(getAllCourses)  
.post(
    isloggedIn,
    upload.single('thumbnail'),
    authorizedRoles('ADMIN'),
    createCourse
    )
    
    
    
    router.route('/:courseId/lectures/:lectureId')
    .delete(
      isloggedIn,
      authorizedRoles('ADMIN'),
      removeLecture
    );
  


router.route('/:id')
.get(isloggedIn, getLecturesByCourseId)
.put(isloggedIn,authorizedRoles('ADMIN'), updateCourse)
.delete(isloggedIn,authorizedRoles('ADMIN'), removeCourse)
.post(isloggedIn, authorizedRoles('ADMIN'), upload.fields([
  { name: 'video', maxCount: 1 },  // For video
  { name: 'thumbnail', maxCount: 1 } // For thumbnail image
]), addLecturesToCourse);




export default router;

