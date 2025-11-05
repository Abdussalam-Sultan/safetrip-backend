import jwt from 'jsonwebtoken'
import APP_CONFIG from '../config/APP_CONFIG.js'

//we create the actual signin here

async function generatetoken(user){
    try {
        const payload = {id: user.user_uuid, username: user.username, role: user.role}
    return jwt.sign(payload, APP_CONFIG.JWT_SECRET, {
        expiresIn: APP_CONFIG.JWT_REFRESH_EXPIRES_IN,
    })
    } catch (error) {
        throw new Error("Error generating Token")
    }
    
}

//after generating you need to verify
async function verifytoken(token){
    try {
        return jwt.verify(token, APP_CONFIG.JWT_SECRET);
    } catch (error){
        throw new Error("Invalid Token")
    }
};

//Generate refreshToken

async function generateRefreshToken(user, token){
    try {
        const payload = {id: user.user_uuid, username: user.username, role: user.role, tokenid: token}
    return jwt.sign(payload, APP_CONFIG.JWT_SECRET, {
        expiresIn: APP_CONFIG.JWT_REFRESH_EXPIRES_IN,
    })
    } catch (error) {
        throw new Error("Error generating Refresh Token")
    }
    
}

//after generating you need to verify
async function verifyRefreshToken(token){
    try {
        return jwt.verify(token, APP_CONFIG.JWT_SECRET);
    } catch (error){
        throw new Error("Invalid Refresh Token")
    }
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

export default{
    generatetoken,
    verifytoken,
    generateRefreshToken,
    verifyRefreshToken,
    resendOtpService,
    verifyUser
};