const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm người dùng và kiểm tra vai trò
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401);
        throw new Error('Không tìm thấy người dùng');
      }

      // Kiểm tra xem người dùng có phải là admin hay không
      if (user.role !== 'admin') {
        res.status(403);
        throw new Error('Không có quyền truy cập trang quản trị');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Không được ủy quyền, token không hợp lệ');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Không được ủy quyền, không có token');
  }
});
