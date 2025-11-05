import AppError from "../utils/AppError.js"
import  {
    changePassword,
    createUser, 
    loginUser, 
    logoutUser
} from "../services/userServices.js";
import User from "../models/User.js";
import { getOtp, getOtpExpiryTime } from "../utils/otpGen.js";
import { validationResult } from "express-validator";
import APP_CONFIG from "../config/APP_CONFIG.js";
import logger from "../config/logger.js";
import emailService from "../services/emailService.js";



async function registerUser (req, res){
  try {
      const {username, email, password, phoneNumber, gender, role = "user"} = req.body;
      
      const otp = getOtp();
      const otpTimeMins = APP_CONFIG.OTP_EXPIRY_TIME_MINS;
      const otpTime = getOtpExpiryTime(otpTimeMins);

      const user = await createUser({username, email, password, gender, phoneNumber, role, otp, otpTime});

      
      await emailService.sendOtp(user.email, "Verify your account", user.username, otp, otpTimeMins);
      res.status(201).json({Success: true, message:"Verification email sent to your email."})
      
    } catch (error) {
      logger.error("Registration Error:", error);
       throw new AppError(error || "Registration Failed")
    }
};

// Verify OTP
async function verifyEmail (req, res) {
   const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0].msg });

  const { email, otp } = req.body;
  const user = await verifyUser(email, otp);
  if (!user) return res.status(400).send("Invalid OTP");

  // Send welcome email
  try {
    await emailService.sendWelcomeEmail(user.email, 'Welcome to Safe Trip!', user.name);
  } catch (error) {
    logger.error(error.message);
    throw new AppError(error.nessage, 500);
  };

  res.clearCookie("token");
  res.status(200).send("Account verification was successful")
};


// Resend otp
async function resendOtp(req, res) {
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


async function login (req, res){
    const {email, password} = req.body
    try {
        const user = await loginUser({email, password});
        res.status(200).json({Success: true, data: user});
    } catch (error) {
        throw new AppError(error || "Invalid Email or Password", 401)
    }
};


const changePasswordController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      data: errors.array().map(e => e.msg)
    });
  }

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    await changePassword(userId, oldPassword, newPassword);

    res.status(201).json({
      success: true,
      message: 'Password changed successfully',
      user: {
        id: req.user.id, 
        username: req.user.username,
        role: req.user.role
      }
    });
    user
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

async function forgotPassword(email, otp, otptime){
    const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");
  
  user.otp = otp;
  user.otpTime = otptime;
  
  await user.save();

  return user;
};

// Logout
const logout = async (req, res) => {
  logoutUser(res);
  res.status(200).json({message: "Log out successful."});
};

// Reset password using OTP
async function resetPassword(email, otp, newPassword) {
  const user = await User.findOne({ where: { email } });

  if (!user || !user.otp || user.otp !== otp || !user.otpTime || user.otpTime < new Date()) throw new Error("Invalid OTP");
  
  const hashed = await bcrypt.hash(newPassword, 10);
  
  user.password = hashed;
  user.otp = null;
  user.otpTime = null;

  await user.save();
  return user;
};


function getEmailOTP(req, res) {
    res.send("Email OTP sent")
};




export {
    registerUser,
    changePasswordController,
    getEmailOTP,
    verifyEmail,
    login,
    forgotPassword,
    logout,
    resetPassword,
    resendOtp
};
