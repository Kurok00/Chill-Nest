const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectAdmin = async (req, res, next) => {
  let token;

  console.log('=== BẮT ĐẦU ADMIN MIDDLEWARE ===');
  console.log('Request URL:', req.originalUrl);
  console.log('Request Method:', req.method);
  console.log('Headers Authorization:', req.headers.authorization);
  console.log('JWT_SECRET tồn tại:', !!process.env.JWT_SECRET);
  console.log('Timestamp:', new Date().toISOString());

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('✓ Tìm thấy Bearer token trong header');
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('✓ Token được trích xuất thành công');
      console.log('Token length:', token.length);
      console.log('Token preview:', token.substring(0, 50) + '...');

      // Verify token
      console.log('🔍 Bắt đầu verify token...');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✓ Token verify thành công');
      console.log('Token decoded data:', JSON.stringify(decoded, null, 2));

      // Get admin from the token
      console.log('🔍 Tìm kiếm user trong database với ID:', decoded.id);
      req.admin = await User.findById(decoded.id).select('-password');
      console.log('Database query completed');
      
      if (req.admin) {
        console.log('✓ Tìm thấy user trong database');
        console.log('User info:', {
          id: req.admin._id,
          username: req.admin.user_name,
          email: req.admin.email,
          role: req.admin.role,
          isVerified: req.admin.is_verified
        });
      } else {
        console.log('❌ KHÔNG tìm thấy user trong database');
      }

      // Check if user exists
      if (!req.admin) {
        console.log('❌ LỖI: User không tồn tại trong database');
        console.log('User ID từ token:', decoded.id);
        console.log('Trả về lỗi 401');
        return res.status(401).json({ 
          message: 'Token không hợp lệ - người dùng không tồn tại',
          debug: {
            userId: decoded.id,
            timestamp: new Date().toISOString()
          }
        });
      }

      // Check if user is admin
      console.log('🔍 Kiểm tra quyền admin...');
      console.log('User role hiện tại:', req.admin.role);
      if (req.admin.role !== 'admin') {
        console.log('❌ LỖI: User không có quyền admin');
        console.log('Role thực tế:', req.admin.role);
        console.log('Role yêu cầu: admin');
        return res.status(403).json({ 
          message: 'Không có quyền truy cập trang quản trị',
          debug: {
            currentRole: req.admin.role,
            requiredRole: 'admin',
            userId: req.admin._id
          }
        });
      }

      console.log('✅ TẤT CẢ KIỂM TRA THÀNH CÔNG');
      console.log('=== KẾT THÚC ADMIN MIDDLEWARE ===');
      next();
    } catch (error) {
      console.log('❌ LỖI KHI VERIFY TOKEN');
      console.log('Error name:', error.name);
      console.log('Error message:', error.message);
      console.log('Error stack:', error.stack);
      console.log('Token đã gửi:', token);
      
      if (error.name === 'TokenExpiredError') {
        console.log('🕐 Token đã hết hạn');
        console.log('Expired at:', error.expiredAt);
        return res.status(401).json({ 
          message: 'Token đã hết hạn',
          debug: {
            expiredAt: error.expiredAt,
            error: 'TokenExpiredError'
          }
        });
      } else if (error.name === 'JsonWebTokenError') {
        console.log('🔐 Token không hợp lệ');
        return res.status(401).json({ 
          message: 'Token không hợp lệ',
          debug: {
            error: 'JsonWebTokenError',
            message: error.message
          }
        });
      } else {
        console.log('🔥 Lỗi không xác định');
        return res.status(401).json({ 
          message: 'Lỗi xác thực không xác định',
          debug: {
            error: error.name,
            message: error.message
          }
        });
      }
    }
  } else {
    console.log('❌ KHÔNG TÌM THẤY BEARER TOKEN');
    console.log('Authorization header:', req.headers.authorization);
    console.log('All headers:', JSON.stringify(req.headers, null, 2));
    res.status(401).json({ 
      message: 'Không được phép truy cập, không có token',
      debug: {
        hasAuthHeader: !!req.headers.authorization,
        authHeader: req.headers.authorization
      }
    });
  }
};

module.exports = { protectAdmin };
