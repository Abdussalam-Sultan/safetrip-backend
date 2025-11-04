import jwt from 'jsonwebtoken';
import APP_CONFIG from '../config/APP_CONFIG.js';
import User from "../models/User.js"


//Creating Signin using JWT

async function createtoken(user){
    try {
        const payload = {id:user.user_UUID, name: user.name}
        return jwt.sign(payload, APP_CONFIG.JWT_SECRET, {
            expiresIn: APP_CONFIG.JWT_EXPIRES_IN,
        })
    } catch (error) {
        throw new Error("Error creating Token")
    }
}

//verifying JWT
async function verifytoken(token){
    try {
        return jwt.verify(token, APP_CONFIG.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid Token")
    }
};


async function createRefreshToken(user, token){
    try {
        const payload = {id:user.user_UUID, name: user.name, tokenid: token}
        return jwt.sign(payload, APP_CONFIG.JWT_SECRET, {
            expiresIn: APP_CONFIG.JWT_EXPIRES_IN,
        })
    } catch (error) {
        throw new Error("Error creating FreshToken")
    }
}

//verifying JWT
async function verifyRefresToken(token){
    try {
        return jwt.verify(token, APP_CONFIG.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid Token")
    }
};

// Verify user OTP
const verifyUser = async (email, otp) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !user.otp || user.otp !== otp || !user.otpTime || user.otpTime < new Date()) return null;
  
  user.verified = true;
  user.otp = null;
  user.otptime = null;

  await user.save();

  return user;
};

// Resend otp - for resend cases
const resendOtpService = async (id, otp, otpTime) => {
  const user = await User.findByPk( id );
  if (!user) return null;

  user.otp = otp;
  user.otpTime = otpTime;

  await user.save();

  return user;
};

export default {
    createtoken,
    verifytoken,
    createRefreshToken,
    verifyRefresToken,
    verifyUser,
    resendOtpService,
};