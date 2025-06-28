const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  verifyEmail,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  sendPhoneVerification,
  confirmPhoneVerification,
  verifyEmailOtp,
  checkUniqueUserInfo,
  resendOtp, // Thêm controller mới
  registerAdmin,
  loginAdmin,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createUserByAdmin,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/verify-otp', verifyEmailOtp);
router.post('/resend-otp', resendOtp); // Thêm route mới cho resend OTP
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);
router.post('/check-unique', checkUniqueUserInfo);

// Admin routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/changepassword', protect, changePassword);
router.post('/verifyphone', protect, sendPhoneVerification);
router.post('/verifyphone/confirm', protect, confirmPhoneVerification);

// Admin user management routes
router.route('/')
  .get(protect, admin, getAllUsers) // Lấy danh sách user
  .post(protect, admin, createUserByAdmin); // Tạo user mới từ admin

router.route('/:id')
  .get(protect, admin, getUserById) // Lấy 1 user
  .put(protect, admin, updateUserById) // Cập nhật user
  .delete(protect, admin, deleteUserById); // Xóa user

module.exports = router;