import { where } from "sequelize";
import User from "../models/User";
import Utils from "../utils/authHandler.js"


//for this services, we need to check if users exists

async function registerUser(userData){
    const checkEmailExist = await User.findOne({
        where: {email: userData.email}
    });
    if(checkEmailExist) throw new error("Email already exist")

    
    const checkFullnameExist = await User.findOne({
        where: {fullname: userData.fullname}
    });
    if(checkFullnameExist) throw new error ("Username already exist")

    const newUser = await User.create(userData)

    return newUser;
};

async function login(loginCredentials){
    const user = await user.findOne({where:
        {email:loginCredentials.emailAddress}
    });
    if (!user) throw new Error("Invalid Email or Password")

//Checks for Valid Password
const isPasswordMatch = await user.verifyPassword(
    loginCredentials.password
);

if (!isPasswordMatch) throw new Error("Invalid Email or Password")

const token = Utils.createtoken(user)
const RefreshToken = Utils.createRefreshToken(user, token)
delete user.password
return(user, token),
RefreshToken
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none"
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error during logout",
      error: err.message
    });
  }
};


const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otptime = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 minutes

    user.otp = otp;
    user.otpTime = otptime;
    await user.save();

    // Here you would send OTP via email/SMS
    // sendOtpEmail(user.email, otp);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    next(err);
  }
};



// Reset password using OTP
const resetPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({ where: { email } });

  if (!user || !user.otp || user.otp !== otp || !user.otpTime || user.otpTime < new Date()) throw new Error("Invalid OTP");
  
  const hashed = await bcrypt.hash(newPassword, 10);
  
  user.password = hashed;
  user.otp = null;
  user.otpTime = null;

  await user.save();
  return user;
};

// Change password while logged in
const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password is incorrect");

  const hashedNew = await bcrypt.hash(newPassword, 10);
  user.password = hashedNew;
  await user.save();

  return { message: "Password changed successfully" };
};


export {
    registerUser,
    login,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword
};