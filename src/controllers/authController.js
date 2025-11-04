import AppError from "../utils/AppError.js";
import {
    registerUser,
    login,
    logoutUser,
    verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
  resendOtpService
} from "../services/userServices.js";
import { validationResult } from "express-validator";
import emailService from "../services/emailService.js";
import { getOtp, getOtpExpiryTime } from "../utils/otpGen.js";
import APP_CONFIG from "../config/APP_CONFIG.js";


async function createUser (req, res){
//1
    const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0].msg });

    const {name, email, password, phone} = req.body;
//2
  const otp = getOtp();
  const otpTimeMins = APP_CONFIG.OTP_EXPIRY_TIME_MINS;
  const otpTime = getOtpExpiryTime(otpTimeMins);
  
  const token = await registerUser({
  name,
  email,
  password,
  phone,
  otp,
  otpTime
});

  if (!token) return res.status(400).send("Invalid credentials");

//send otp email
    try {
        await emailService.sendOtp(email, "Your OTP Verification Code", name, otp, otpTimeMins);        
    } catch (error) {
        throw new AppError(error || "Registration Failed" )
    };
    res.cookie("token", token);
  // res.render("auth/verify", { email });
  res.status(201).json({ message: "OTP sent to your email" });
};

// Verify OTP
const verify = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0].msg });

  const { email, otp } = req.body;
  const user = await verifyUser(email, otp);
  if (!user) return res.status(400).send("Invalid OTP");

  // Send welcome email
  try {
    await emailService.sendWelcomeEmail(user.email, 'Welcome to Safe Travel App!', user.name);
  } catch (error) {
    logger.error(error.message);
    throw new AppError(error.nessage, 500);
  };

  res.clearCookie("token");
  // res.render("auth/login", { message: "Verification successful!" });
  res.status(200).send("Account verification was successful")
};


// Resend otp
const resendOtp = async (req, res) => {
  const id = req.user.id;
  const otp = getOtp();
  const otpTimeMins = APP_CONFIG.OTP_EXPIRY_TIME_MINS;
  const otpTime = getOtpExpiryTime(otpTimeMins);

  const user = await resendOtpService(id, otp, otpTime);
  if (!user) return res.status(401).send("You are not registered yet! Go to the sign up page!");

  // Send otp email
  try {
    await emailService.sendOtp(user.email, "Your OTP Verification Code", user.name, otp, otpTimeMins);
  } catch (error) {
    logger.error(error.message);
    throw new AppError(error.nessage, 500);
  };

   res.status(201).json({ message: "OTP sent to your email" });
};

async function signIn (req, res){
    const {email, password} = req.body;
    try {
    const user =  await login({email, password})
    res.status(201).json({Success: true, data: user})
                
    } catch (error) {
        throw new AppError(error || "SignIn Failed", 401)
    }
};

// Logout
const logout = async (req, res) => {
  logoutUser(res);
  // res.redirect("/auth/login");
  res.status(200).json({message: "Log out successful."});
};


// Forgot password
const forgot = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0].msg });

  try {
    const { email } = req.body;
    const otp = getOtp();
    const otpTimeMins = APP_CONFIG.OTP_EXPIRY_TIME_MINS;
    const otpTime = getOtpExpiryTime(otpTimeMins);
    
    const user = await forgotPassword(email, otp, otpTime);
    
    if (!user) return res.status(400).send("Invalid credentials");
    await emailService.sendPasswordRecoveryEmail(user.email, 'Password Reset Request', user.name, otp, otpTimeMins);
    
    res.status(200).json({ message: "Password reset email has been sent to your inbox."});

  } catch (error) {
    logger.error(error.message);
    res.send(error.message);
  }
};


// Reset password
const reset = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0].msg });

  try {
    const { email, otp, newPassword } = req.body;
    await resetPassword(email, otp, newPassword);
    
    // res.render("auth/login", { message: "Password reset successful. Please log in." });
    res.status(201).json({message: "Password reset was successful."});

  } catch (error) {
    res.status(400).send(error.message);
  }
};


//  Change password (for logged-in user)
const changePasswordController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({success: false, message: "Validation error", data: errors.array().map(e => e.msg)});
  
  
  
  try {
    if(!req.user || !req.user.id )
    {
      return res.status(401).json({success: false, message: "User not authenticated"})
    }
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    await changePassword(userId, oldPassword, newPassword);
    
    // res.render("profile", { message: "Password changed successfully!" });
    res.status(201).json({success: true, 
      message: "Password change was successful.",
    user: {
      id: req.user.id,
      username: req.user.name,
      
    }
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// async function changePassword (req, res){
//     const {password} = req.body;
//     registerUser({password})
//     res.status(201).json({Success: true, message:"Password changed Succesfully"})
//     try {
        
//     } catch (error) {
//         throw new AppError(error || "Password change failed")
//     }
// };

// function verifyEmail(req, res){
//     const {email} = req.body;
//     registerUser({email})
//     res.status(201).json({Success: true, message:"Email verified Succesfully"})
//     try {
        
//     } catch (error) {
//         throw new AppError(error || "Email verification Failed")
//     }
// };

export {
    createUser,
    signIn,
    changePassword,
    verify,
    resendOtp,
    logout,
    forgot,
    reset,
    changePasswordController,
}