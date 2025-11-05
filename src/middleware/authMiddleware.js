import jwt from 'jsonwebtoken';
import logger from "../config/logger.js"
import APP_CONFIG from '../config/APP_CONFIG.js';
import authHandler from '../utils/authHandler.js';


const authMiddleware = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = await authHandler.verifytoken(token);
        
    const userId = decoded.id || decoded.userId
    
     if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    };
    req.user = { id: userId, username: decoded.username, role:decoded.role };
        
    next();
  } catch (err) {
    logger.error('JWT verification failed:', err.message);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const authMiddlewareOTP = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = await authHandler.verifyOTPtoken(token);
        
    const userId = decoded.id || decoded.userId
    
     if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    };
    req.user = { id: userId, username: decoded.username, role:decoded.role };
        
    next();
  } catch (err) {
    logger.error('JWT verification failed:', err.message);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export {authMiddleware, authMiddlewareOTP}