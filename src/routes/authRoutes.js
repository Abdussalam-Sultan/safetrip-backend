import express from "express";
import {
    createUser,
    changePassword,
    signIn,
    verify,
    resendOtp,
    logout,
    forgot,
    reset,
    changePasswordController
    //loginUser
} from "../controllers/authController.js";
import {
    createUserValidation,
    loginValidator,
    changePasswordValidator,
    verifyEmailValidation,
    forgotPasswordValidator
} from "../utils/validation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { authMiddleware, verifyAccountMiddleware } from "../services/authMiddleware.js";

const router = express.Router();

router.post("/register", createUserValidation, validationMiddleware, createUser);
router.post("/login", loginValidator, validationMiddleware, signIn);
router.post("/resetPassword", changePasswordValidator, validationMiddleware, changePassword);
router.post("/verify", verifyEmailValidation, validationMiddleware, verify);
router.get("/send-otp", verifyAccountMiddleware, resendOtp);
router.post("/forgot", forgotPasswordValidator, validationMiddleware, forgot);
router.get("/logout", logout);
router.post("/change-password", changePasswordController, authMiddleware, changePassword)
//router.post("/reset", )

export default router;