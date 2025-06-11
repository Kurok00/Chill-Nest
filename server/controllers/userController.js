const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer'); // Không dùng nữa
const crypto = require('crypto');
const sendMail = require('../utils/sendMail');

// Generate JWT token with 7-day expiration
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Make token valid for 7 days
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  // Tìm user theo email hoặc số điện thoại
  const user = await User.findOne({
    $or: [
      { email: identifier },
      { phone_number: identifier }
    ]
  });

  if (user && (await user.matchPassword(password))) {
    // Create response with user info
    res.json({
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      role: user.role,
      profile_image: user.profile_image,
      is_verified: user.is_verified,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Email/Số điện thoại hoặc mật khẩu không đúng');
  }
});

// @desc    Register a new user (Gửi OTP, chưa tạo user)
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { user_name, email, password, phone_number } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Người dùng đã tồn tại');
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 phút

  // Lưu OTP vào DB tạm (tạo user tạm với trạng thái chưa xác thực)
  let tempUser = await User.findOne({ email });
  if (!tempUser) {
    tempUser = new User({
      user_name,
      email,
      password,
      phone_number,
      is_verified: false,
      email_otp: otp,
      email_otp_expires: otpExpires
    });
    await tempUser.save();
  } else {
    tempUser.email_otp = otp;
    tempUser.email_otp_expires = otpExpires;
    await tempUser.save();
  }

  // Gửi OTP qua email bằng Resend
  await sendMail({
    to: email,
    subject: 'Mã xác thực đăng ký tài khoản',
    html: `
      <h1>Xin chào ${user_name}!</h1>
      <p>Cảm ơn bạn đã đăng ký tài khoản. Đây là mã xác thực OTP của bạn:</p>
      <div style="font-size: 2rem; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">${otp}</div>
      <p>Vui lòng nhập mã OTP này vào trang đăng ký để hoàn tất quá trình xác thực tài khoản.</p>
      <p>Mã này sẽ hết hạn sau 10 phút.</p>
      <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
    `
  });

  res.status(200).json({
    message: `Đã gửi mã OTP tới email ${email}. Vui lòng kiểm tra email và nhập mã OTP để xác nhận đăng ký.`,
    otpExpires
  });
});

// @desc    Resend OTP for verification
// @route   POST /api/users/resend-otp
// @access  Public
const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Find the temporary user by email
  const tempUser = await User.findOne({ email, is_verified: false });
  if (!tempUser) {
    res.status(400);
    throw new Error('Không tìm thấy thông tin đăng ký hoặc đã xác thực.');
  }

  // Generate new 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  // Update OTP in DB
  tempUser.email_otp = otp;
  tempUser.email_otp_expires = otpExpires;
  await tempUser.save();

  // Gửi OTP mới qua email bằng Resend
  await sendMail({
    to: email,
    subject: 'Mã xác thực mới cho tài khoản của bạn',
    html: `
      <h1>Xin chào ${tempUser.user_name}!</h1>
      <p>Theo yêu cầu của bạn, đây là mã xác thực OTP mới:</p>
      <div style="font-size: 2rem; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">${otp}</div>
      <p>Vui lòng nhập mã OTP này vào trang đăng ký để hoàn tất quá trình xác thực tài khoản.</p>
      <p>Mã này sẽ hết hạn sau 10 phút.</p>
      <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
    `
  });

  res.status(200).json({
    message: `Đã gửi mã OTP mới tới email ${email}. Vui lòng kiểm tra email và nhập mã OTP để xác nhận đăng ký.`,
    otpExpires
  });
});

// @desc    Verify email OTP và tạo user thật sự
// @route   POST /api/users/verify-otp
// @access  Public
const verifyEmailOtp = asyncHandler(async (req, res) => {
  const { user_name, email, password, phone_number, otp } = req.body;

  // Tìm user tạm theo email
  const tempUser = await User.findOne({ email, is_verified: false });
  if (!tempUser) {
    res.status(400);
    throw new Error('Không tìm thấy thông tin đăng ký hoặc đã xác thực.');
  }

  // Kiểm tra OTP và hạn
  if (!otp || otp.length !== 6 || tempUser.email_otp !== otp || !tempUser.email_otp_expires || tempUser.email_otp_expires < Date.now()) {
    res.status(400);
    throw new Error('Mã OTP không đúng hoặc đã hết hạn!');
  }

  // Xác thực thành công, cập nhật trạng thái user
  tempUser.is_verified = true;
  tempUser.email_otp = undefined;
  tempUser.email_otp_expires = undefined;
  await tempUser.save();

  res.status(201).json({
    _id: tempUser._id,
    user_name: tempUser.user_name,
    email: tempUser.email,
    role: tempUser.role,
    is_verified: tempUser.is_verified,
    message: 'Đăng ký và xác thực thành công! Bạn có thể đăng nhập ngay bây giờ.',
  });
});

// @desc    Verify user email
// @route   GET /api/users/verify/:token
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    verification_token: token,
    verification_token_expires: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error('Token xác thực không hợp lệ hoặc đã hết hạn');
  }

  // Update user verification status
  user.is_verified = true;
  user.verification_token = undefined;
  user.verification_token_expires = undefined;
  await user.save();

  res.status(200).json({ message: 'Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      phone_number: user.phone_number,
      birthday: user.birthday,
      role: user.role,
      profile_image: user.profile_image,
      address: user.address,
      social_media: user.social_media,
      is_verified: user.is_verified,
      preferences: user.preferences,
    });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.user_name = req.body.user_name || user.user_name;
    user.email = req.body.email || user.email;
    user.phone_number = req.body.phone_number || user.phone_number;
    user.birthday = req.body.birthday || user.birthday;
    user.profile_image = req.body.profile_image || user.profile_image;
    
    if (req.body.address) {
      user.address = {
        ...user.address,
        ...req.body.address
      };
    }
    
    if (req.body.social_media) {
      user.social_media = {
        ...user.social_media,
        ...req.body.social_media
      };
    }
    
    if (req.body.preferences) {
      user.preferences = {
        ...user.preferences,
        ...req.body.preferences
      };
    }
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      user_name: updatedUser.user_name,
      email: updatedUser.email,
      phone_number: updatedUser.phone_number,
      birthday: updatedUser.birthday,
      role: updatedUser.role,
      profile_image: updatedUser.profile_image,
      address: updatedUser.address,
      social_media: updatedUser.social_media,
      is_verified: updatedUser.is_verified,
      preferences: updatedUser.preferences,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }
});

// @desc    Forgot password
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng với email này');
  }
  
  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
  
  user.reset_password_token = resetToken;
  user.reset_password_expires = resetTokenExpires;
  await user.save();
  
  // Send reset email
  let frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;
  
  await sendMail({
    to: user.email,
    subject: 'Khôi phục mật khẩu',
    html: `
      <h1>Xin chào ${user.user_name}!</h1>
      <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết dưới đây để đặt lại mật khẩu của bạn:</p>
      <a href="${resetUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
      <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
      <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.</p>
    `,
    from: 'ChillNest <anvnt96@gmail.com>' // Đảm bảo from hợp lệ với SendGrid
  });
  
  res.status(200).json({ message: 'Email đặt lại mật khẩu đã được gửi' });
});

// @desc    Reset password
// @route   POST /api/users/resetpassword/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  const user = await User.findOne({
    reset_password_token: token,
    reset_password_expires: { $gt: Date.now() }
  });
  
  if (!user) {
    res.status(400);
    throw new Error('Token đặt lại không hợp lệ hoặc đã hết hạn');
  }
  
  // Set new password
  user.password = password;
  user.reset_password_token = undefined;
  user.reset_password_expires = undefined;
  await user.save();
  
  res.status(200).json({ message: 'Mật khẩu đã được đặt lại thành công. Bạn có thể đăng nhập ngay bây giờ.' });
});

// @desc    Change password (when logged in)
// @route   PUT /api/users/changepassword
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }
  
  // Check if current password matches
  if (!(await user.matchPassword(currentPassword))) {
    res.status(401);
    throw new Error('Mật khẩu hiện tại không đúng');
  }
  
  // Set new password
  user.password = newPassword;
  await user.save();
  
  res.status(200).json({ message: 'Thay đổi mật khẩu thành công' });
});

// @desc    Send verification SMS
// @route   POST /api/users/verifyphone
// @access  Private
const sendPhoneVerification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }
  
  // Generate verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  const codeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  user.phone_verification_code = verificationCode;
  user.phone_verification_expires = codeExpires;
  await user.save();
  
  // Here you would integrate with an SMS provider like Twilio
  // For now, we'll just return the code (in production, this should send an actual SMS)
  
  res.status(200).json({ 
    message: 'Mã xác thực đã được gửi đến số điện thoại của bạn',
    // In production, remove the line below - this is just for development
    code: verificationCode 
  });
});

// @desc    Verify phone number
// @route   POST /api/users/verifyphone/confirm
// @access  Private
const confirmPhoneVerification = asyncHandler(async (req, res) => {
  const { code } = req.body;
  
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }
  
  if (!user.phone_verification_code || !user.phone_verification_expires || user.phone_verification_expires < Date.now()) {
    res.status(400);
    throw new Error('Mã xác thực không hợp lệ hoặc đã hết hạn');
  }
  
  if (user.phone_verification_code.toString() !== code.toString()) {
    res.status(400);
    throw new Error('Mã xác thực không đúng');
  }
  
  user.phone_verified = true;
  user.phone_verification_code = undefined;
  user.phone_verification_expires = undefined;
  await user.save();
  
  res.status(200).json({ message: 'Xác thực số điện thoại thành công' });
});

// @desc    Check if username, email, or phone number exists (for real-time validation)
// @route   POST /api/users/check-unique
// @access  Public
const checkUniqueUserInfo = asyncHandler(async (req, res) => {
  const { user_name, email, phone_number } = req.body;
  let exists = {};
  if (user_name) {
    const user = await User.findOne({ user_name });
    exists.user_name = !!user;
  }
  if (email) {
    const user = await User.findOne({ email });
    exists.email = !!user;
  }
  if (phone_number) {
    const user = await User.findOne({ phone_number });
    exists.phone_number = !!user;
  }
  res.json({ exists });
});

// @desc    Register a new admin user
// @route   POST /api/users/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { user_name, email, password, phone_number, secretCode } = req.body;

  // Check if secret code is correct
  if (secretCode !== '961210') {
    res.status(401);
    throw new Error('Mã bí mật không chính xác');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Người dùng đã tồn tại');
  }

  // Create user
  const user = await User.create({
    user_name,
    email,
    password, // Hashed automatically in the model
    phone_number,
    role: 'admin',
    is_verified: true, // Admin users are auto-verified
  });

  if (user) {
    // Return user info with token
    res.status(201).json({
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      role: user.role,
      profile_image: user.profile_image,
      is_verified: user.is_verified,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Dữ liệu người dùng không hợp lệ');
  }
});

// @desc    Auth admin user & get token
// @route   POST /api/users/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  console.log('Backend - Login request body:', req.body);
  const { user_name, password } = req.body;

  // Tìm user theo user_name
  const user = await User.findOne({ user_name });
  console.log('Backend - Found user:', user ? {
    _id: user._id,
    user_name: user.user_name,
    role: user.role,
    password: user.password
  } : null);

  // So sánh mật khẩu trực tiếp vì trong database đang là plain text
  if (user && user.password === password) {
    console.log('Backend - Password match successful');
    // Kiểm tra xem người dùng có phải là admin không
    if (user.role !== 'admin') {
      console.log('Backend - User is not admin');
      res.status(403);
      throw new Error('Không có quyền truy cập trang quản trị');
    }

    // Create response with user info
    const response = {
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      role: user.role,
      profile_image: user.profile_image,
      is_verified: user.is_verified,
      token: generateToken(user._id),
    };
    console.log('Backend - Login successful, sending response:', response);
    res.json(response);
  } else {
    console.log('Backend - Login failed: Invalid credentials');
    res.status(401);
    throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
  }
});

module.exports = {
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
  resendOtp,
  registerAdmin,
  loginAdmin,
};
