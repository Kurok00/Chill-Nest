const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// @desc    Register a new admin
// @route   POST /api/users/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
  try {
    const { user_name, email, password, phone_number, secretCode } = req.body;

    // Check secret code
    if (secretCode !== '961210') {
      return res.status(401).json({ message: 'Mã bí mật không chính xác' });
    }

    // Check if admin already exists
    const adminExists = await User.findOne({ $or: [{ email }, { user_name }] });
    if (adminExists) {
      return res.status(400).json({ message: 'Email hoặc tên đăng nhập đã được sử dụng' });
    }

    // Create new admin
    const admin = await User.create({
      user_name,
      email,
      password,
      phone_number,
      role: 'admin',
      is_verified: true // Auto verify admin accounts
    });

    if (admin) {
      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.status(201).json({
        _id: admin._id,
        user_name: admin.user_name,
        email: admin.email,
        role: admin.role,
        token
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login admin
// @route   POST /api/users/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    console.log('Login attempt:', { user_name, password });

    // Find admin by user_name
    const admin = await User.findOne({ user_name });
    console.log('Found admin:', admin ? { 
      _id: admin._id,
      user_name: admin.user_name,
      role: admin.role,
      password: admin.password
    } : null);

    if (!admin) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    // Check if user is admin
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập trang quản trị' });
    }

    // Check password directly since it's stored as plain text
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      _id: admin._id,
      user_name: admin.user_name,
      email: admin.email,
      role: admin.role,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin
}; 