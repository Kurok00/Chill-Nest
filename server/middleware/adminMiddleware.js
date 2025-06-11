const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectAdmin = async (req, res, next) => {
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

      // Get admin from the token
      req.admin = await User.findById(decoded.id).select('-password');

      // Check if user is admin
      if (req.admin.role !== 'admin') {
        return res.status(403).json({ message: 'Không có quyền truy cập trang quản trị' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Không được phép truy cập' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Không được phép truy cập, không có token' });
  }
};

module.exports = { protectAdmin };
