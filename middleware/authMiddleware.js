const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

//Middleware to verify JWT and attach user ID to request
const protect = async (req, res, next) => {
  let token;

  //Check if Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password'); // fetch user once
      if (!req.user) return res.status(404).json({ success: false, message: 'User not found' });

      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }
};

module.exports = protect;