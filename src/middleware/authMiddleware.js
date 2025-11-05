import jwt from 'jsonwebtoken';
import logger from "../utils/loggers.js"
import config from '../config/index.js';



const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
    const userId = decoded.userId || decoded.id
    
     if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    };
    req.user = { id: userId, username: decoded.username, role:decoded.role };
        
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};


function verifyAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = { id: decoded.id }; // attach user info
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}


const verifyAccountMiddleware = (req, res, next) => {
    try {

        const token = req.cookies["token"];

        if (!token) {
            logger.warn("Access denied: No Auth token provided. Please Sign Up.");
            return res.status(401).json({ success: false, message: "Access denied. No token provided. Please Sign Up / Log in."});
        };

        const decoded = jwt.verify(token, config.JWT_OTP_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        logger.error(`JWT verification failed: ${error.message}`);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired." });
        };

        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ success: false, message: "Invalid token." });
        };

        return res.status(500).json({ success: false, message: "Authentication"});
    };
    
};

export {authMiddleware, verifyAccountMiddleware, verifyAuth}