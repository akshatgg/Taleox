import { Router } from "express";
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateuser, getAllIds } from "../controllers/user.controller.js";
import { isloggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();


router.post('/register',upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isloggedIn , getProfile);
router.get('/', isloggedIn , getAllIds);


router.post('/reset-password' , forgotPassword);
router.post('/reset-password/:resetToken',resetPassword);
router.post('/change-password',isloggedIn, changePassword);
router.put('/update',isloggedIn,upload.single("avatar"), updateuser);


 
export default router;





