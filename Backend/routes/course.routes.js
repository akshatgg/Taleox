import { Router } from 'express'; 
import { createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from '../controllers/course.controller.js';
import { isloggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/')
.get(getAllCourses)
.post(
    upload.single('thumbnail'),
    createCourse
    )

router.route('/:id')
.get(isloggedIn, getLecturesByCourseId)
.put(updateCourse)
.delete(removeCourse)

export default router;

