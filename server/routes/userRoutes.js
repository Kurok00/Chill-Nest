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
  checkUniqueUserInfo, // Thêm controller mới
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/verify-otp', verifyEmailOtp);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);
router.post('/check-unique', checkUniqueUserInfo); // Thêm route mới

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/changepassword', protect, changePassword);
router.post('/verifyphone', protect, sendPhoneVerification);
router.post('/verifyphone/confirm', protect, confirmPhoneVerification);

module.exports = router;