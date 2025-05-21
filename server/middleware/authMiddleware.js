const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      // If token is about to expire (less than 1 day), issue a new token
      const tokenExpiration = new Date(decoded.exp * 1000);
      const now = new Date();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      
      if (tokenExpiration - now < oneDayInMs) {
        // Generate new token
        const newToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });
        
        // Set the new token in the response header
        res.setHeader('Authorization', `Bearer ${newToken}`);
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const host = (req, res, next) => {
  if (req.user && (req.user.role === 'host' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a host');
  }
};

module.exports = { protect, admin, host };
