import User from "../models/User.js";
import Utils from "../utils/Auth.js"
import bcrypt from "bcryptjs";


//for this services we need to check if users exists
async function createUser (userData) {
    const checkEmailExists = await User.findOne({where:
         { email:userData.email }
        });
        if(checkEmailExists) {
            throw new Error("Email already exist")
        }
        

    const checkUsernameExists = await User.findOne({where:
         { username:userData.username }
        });
        if(checkUsernameExists) {
            throw new Error("Username already exist")
        }

    const newUser = await User.create(userData);
    
    return newUser;
};

async function loginUser(loginCrendentials) {
    const user = await User.findOne({where:
         { email:loginCrendentials.email }
        });
        if (!user) throw new Error("Invalid Email or Password")

    //Check to see if password is valid
    const isPasswordMatch = await user.verifyPassword(
        loginCrendentials.password
    );
    
    if (!isPasswordMatch) throw new Error("Invalid email or password")

  //manual way to bring in your jsonwebtoken
  const token = await Utils.generatetoken(user);
  const refreshToken = await Utils.generateRefreshToken(user, token);
  return {
      userUUID: user.user_uuid, 
      email: user.email, username:
      user.username, phone: user.phoneNumber || null,
      profilePicture: user.profilePicture || null, gender: user.gender,
      role: user.role, token,
      refreshToken,
      }
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


async function refreshUserToken(refreshToken){
    const decoded = await Utils.verifyRefreshToken(refreshToken)
    const user = await User.findOne({where: {user_uuid: decoded.id}});
    if(!user) throw new Error("User not found")
        
    const newToken = await Utils.generatetoken(user);
    const newRefreshToken = await Utils.generateRefreshToken(user, newToken)

    return{
        token: newToken,
        refreshToken: newRefreshToken,
    };
}



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


const changePassword = async (userId, oldPassword, newPassword) => {
    console.log('Looking for user with ID:', userId)
    const user = await User.findOne({where: {user_uuid: userId}});
    console.log('User fetched:', user)
  if (!user) throw new Error('User not found');

  // Check old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error('Old password is incorrect');

  // Hash and save new password
  const hashedNew = await bcrypt.hash(newPassword, 10);
  user.password = hashedNew;
  await user.save();

  console.log(await User.findAll({ where: { id: '458916b5-82a1-444c-b077-70d6f85a51b4' } }));

  return { message: 'Password changed successfully' };
};


//Note getuserprofile is a protected route and that brings us to caching $ middleware
async function getUserProfile(userUUID){
    const user = await User.findOne({where: {user_uuid: userUUID}})
    if(!user) throw new Error("User not found");
    delete user.password//before sending user profile to frontend, ensure you delete thier password
    return user;
}

export {
    createUser, 
    loginUser,
    getUserProfile,
    logoutUser,
    refreshUserToken,
    forgotPassword,
    resetPassword,
    changePassword
};
