import express from 'express';
import {
    registerUser, 
    verifyEmail, 
    resendOtp, 
    forgotPassword, 
    resetPassword,
    login, 
    changePasswordController,
    logoutController, 
} from '../controllers/authController.js';
import { 
    registrationValidator, 
    verifyEmailValidation, 
    forgotPasswordValidator, 
    resetPasswordValidator, 
    loginValidator, 
    changePasswordValidator,
     
} from '../utils/validation.js';
import validationMiddleware from '../middleware/validationMiddleware.js';
import { authMiddleware, authMiddlewareOTP } from '../middleware/authMiddleware.js';


const router = express.Router()

router.post("/register", registrationValidator, validationMiddleware, registerUser);
router.post("/verify", verifyEmailValidation, validationMiddleware, verifyEmail);
router.get("/send-otp", authMiddlewareOTP, resendOtp);
router.post("/forgot", forgotPasswordValidator, validationMiddleware, forgotPassword);
router.post("/resetPassword", resetPasswordValidator, validationMiddleware, resetPassword);
router.post("/login", loginValidator, validationMiddleware, login);
router.post("/change-password", changePasswordValidator, validationMiddleware, authMiddleware, changePasswordController)
router.get("/logout", authMiddleware, logoutController);


export default router