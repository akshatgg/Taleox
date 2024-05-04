import { Router } from "express";
import { forgotPassword, getProfile, login, logout, register, resetPassword } from "../controllers/user.controller.js";
import { isloggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const router = Router();

router.post('/register',upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isloggedIn , getProfile);
router.post('/reset-password' , forgotPassword);
router.post('/reset-password/:resetToken',resetPassword);
export default router;
