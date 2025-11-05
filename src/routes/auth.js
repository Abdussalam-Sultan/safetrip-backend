import express from 'express';
import { validationResult } from 'express-validator';
import {registerUser, login, verifyEmail, resendOtp, changePasswordController} from '../controllers/authController.js';
import { changePasswordValidator, forgotPasswordValidator, loginValidator, registrationValidator, verifyEmailValidation } from '../utils/validation.js';
import validationMiddleware from '../middleware/validationMiddleware.js';
import { changePassword, forgotPassword, logoutUser } from '../services/userServices.js';
import { verifyAccountMiddleware, authMiddleware, verifyAuth } from '../middleware/authMiddleware.js';


const router = express.Router()

router.post("/register", registrationValidator, validationMiddleware, registerUser);
router.post("/login", loginValidator, validationMiddleware, login);
router.post("/resetPassword", changePasswordValidator, validationMiddleware, changePassword);
router.post("/verify", verifyEmailValidation, validationMiddleware, verifyEmail);
router.get("/send-otp", verifyAccountMiddleware, resendOtp);
router.post("/forgot", forgotPasswordValidator, validationMiddleware,  forgotPassword);
router.get("/log-out", authMiddleware, logoutUser);
router.post("/change-password", authMiddleware, changePasswordController, changePasswordValidator, changePassword)


export default router