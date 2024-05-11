import { Router } from 'express'; 
import { createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from '../controllers/course.controller.js';
import { isloggedIn,authorizedRoles } from "../middleware/auth.middleware.js";
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

router.route('/:id')
.get(isloggedIn, getLecturesByCourseId)
.put(isloggedIn,authorizedRoles('ADMIN'), updateCourse)
.delete(isloggedIn,authorizedRoles('ADMIN'), removeCourse)

export default router;

