import jwt from 'jsonwebtoken';
import APP_CONFIG from '../config/APP_CONFIG.js';
import AppError from './AppError.js';


//Creating Signin using JWT

async function createtoken(user){
    try {
        const payload = {id:user.user_UUID, username: user.username, role: user.role}
        return jwt.sign(payload, APP_CONFIG.JWT_SECRET, {
            expiresIn: APP_CONFIG.JWT_EXPIRES_IN,
        })
    } catch (error) {
        throw new AppError("Error creating Token", 500)
    }
}

//verifying JWT
async function verifytoken(token){
    try {
        return jwt.verify(token, APP_CONFIG.JWT_SECRET);
    } catch (error) {
        throw new AppError("Invalid Token", 400)
    }
};

//Creating Signin using JWT

async function createOTPtoken(user){
    try {
        const payload = {id:user.user_UUID, username: user.username, role: user.role}
        return jwt.sign(payload, APP_CONFIG.JWT_OTP_SECRET, {
            expiresIn: APP_CONFIG.JWT_EXPIRES_IN,
        })
    } catch (error) {
        throw new AppError("Error creating Token", 500)
    }
}

//verifying JWT
async function verifyOTPtoken(token){
    try {
        return jwt.verify(token, APP_CONFIG.JWT_OTP_SECRET);
    } catch (error) {
        throw new AppError("Invalid Token", 400)
    }
};


async function createRefreshToken(user, token){
    try {
        const payload = {id:user.user_UUID, username: user.username, role: user.role, tokenid: token}
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


export default {
    createtoken,
    verifytoken,
    createOTPtoken,
    verifyOTPtoken,
    createRefreshToken,
    verifyRefresToken,
};