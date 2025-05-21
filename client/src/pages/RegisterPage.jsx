import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Notification from '../components/ui/Notification';

const RegisterPage = () => {
  const [user_name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUserName, setRegisterUserName] = useState('');
  const [otpError, setOtpError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp');
      return;
    }
    if (password.length < 6) {
      setMessage('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    setMessage('');
    try {
      // Gọi trực tiếp API đăng ký, không dùng dispatch để lấy đúng response
      const res = await axios.post('http://localhost:5000/api/users/register', {
        user_name,
        email,
        password,
        phone_number
      });
      setRegisterEmail(email);
      setRegisterUserName(user_name);
      setShowOtpInput(true);
      setMessage(''); // Xóa message lỗi nếu có
      // Hiển thị thông báo nhắc nhập OTP ngay trên form
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Đăng ký thất bại');
      setShowOtpInput(false); // Đảm bảo không hiện OTP nếu lỗi
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');
    try {
      // Gửi lại toàn bộ thông tin + otp để tạo user thật sự
      await axios.post('http://localhost:5000/api/users/verify-otp', {
        user_name,
        email: registerEmail,
        password,
        phone_number,
        otp
      });
      setShowOtpInput(false);
      dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'success', message: 'Xác thực email thành công! Bạn có thể đăng nhập.' } });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Mã OTP không đúng hoặc đã hết hạn');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 animate-fadeIn">
      <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl animate-slideUp flex bg-[#151c32] border border-gray-800">
        {/* Left: Background + Logo + Slogan */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-cover bg-center p-8" style={{backgroundImage: "url('https://i.imgur.com/2yaf2wb.jpg')"}}>
          <div></div>
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-4">
              <img src="/logo192.png" alt="ChillNest" className="w-12 h-12 mr-3" />
              <span className="text-2xl font-bold text-white drop-shadow">ChillNest</span>
            </div>
            <p className="text-white/80 text-lg font-medium drop-shadow max-w-xs">Khám phá & đặt phòng khách sạn, homestay tuyệt vời nhất</p>
          </div>
          <div></div>
        </div>
        {/* Right: Register Form */}
        <div className="w-full md:w-1/2 bg-[#1b2340] p-8 flex flex-col justify-center min-h-[500px] relative">
          <button onClick={() => navigate('/')} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#232b4a] hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors text-xl shadow">
            <FaEyeSlash />
          </button>
          <h4 className="text-2xl font-bold text-white mb-2">Tạo tài khoản mới</h4>
          <p className="mb-6 text-gray-300">Nếu bạn đã có tài khoản, <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-yellow-400 font-semibold hover:underline">đăng nhập</Link></p>
          {showOtpInput ? (
            <form className="v-form" onSubmit={handleOtpSubmit}>
              <div className="text-center mb-4">
                <p className="text-green-400 font-semibold">Đã gửi mã OTP tới email <b>{registerEmail}</b></p>
                <p className="text-gray-200">Vui lòng nhập mã OTP gồm 6 số để xác nhận đăng ký tài khoản cho <b>{registerUserName}</b>.</p>
              </div>
              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  required
                  className="text-center text-2xl tracking-widest border border-gray-600 rounded px-4 py-2 w-40 bg-[#232b4a] text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="Nhập OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              {otpError && <div className="text-red-400 text-center mb-2 font-semibold animate-shake">{otpError}</div>}
              <button type="submit" className="w-full py-3 rounded-lg font-bold text-lg shadow mt-2 transition-all bg-yellow-400 hover:bg-yellow-500 text-[#151c32]">Xác nhận OTP</button>
            </form>
          ) : (
            <form className="v-form" onSubmit={submitHandler} autoComplete="off">
              <div className="form-group mb-3">
                <input className="form-control v-form-control w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#232b4a] text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base placeholder-gray-400" placeholder="Tên hiển thị" type="text" name="name" required value={user_name} onChange={e => setUserName(e.target.value)} />
              </div>
              <div className="form-group mb-3">
                <input className="form-control v-form-control w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#232b4a] text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base placeholder-gray-400" placeholder="Email" type="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group mb-3 relative">
                <input className="form-control v-form-control w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#232b4a] text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base pr-12 placeholder-gray-400" placeholder="Mật khẩu" minLength={6} type={showPassword ? 'text' : 'password'} name="password" required value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
              </div>
              <div className="form-group mb-4 relative">
                <input className="form-control v-form-control w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#232b4a] text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base pr-12 placeholder-gray-400" placeholder="Nhập lại mật khẩu" minLength={6} type={showPassword ? 'text' : 'password'} name="cf_password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
              </div>
              <div className="form-group mb-3">
                <input className="form-control v-form-control w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#232b4a] text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base placeholder-gray-400" placeholder="Số điện thoại" type="tel" name="phone_number" value={phone_number} onChange={e => setPhoneNumber(e.target.value)} />
              </div>
              {message && <div className="text-red-400 text-center mb-2 font-semibold animate-shake">{message}</div>}
              <div className="form-group action-btn mt-4 mb-4 d-grid">
                <button className="w-full py-3 rounded-lg font-bold text-lg shadow transition-all bg-yellow-400 hover:bg-yellow-500 text-[#151c32]" disabled={loading}>{loading ? 'Đang đăng ký...' : 'Đăng ký'}</button>
              </div>
            </form>
          )}
        </div>
        <style>{`
          .animate-fadeIn { animation: fadeIn .3s; }
          .animate-slideUp { animation: slideUp .4s cubic-bezier(.4,2,.6,1); }
          .animate-shake { animation: shake .3s; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: none; opacity: 1; } }
          @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
        `}</style>
      </div>
    </div>
  );
};

export default RegisterPage;