import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/adminActions';
import { FaUserShield, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaPhone, FaUser } from 'react-icons/fa';

const AdminRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get adminRegister state from Redux store
  const adminRegister = useSelector((state) => state.adminRegister);
  const { loading, error: registerError, adminInfo } = adminRegister;

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (adminInfo) {
      navigate('/admin/dashboard');
    }
  }, [navigate, adminInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!name.trim()) {
      setError('Tên không được để trống');
      return;
    }

    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Email không hợp lệ');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp');
      return;
    }

    if (phoneNumber && !/^\d{8,15}$/.test(phoneNumber)) {
      setError('Số điện thoại phải từ 8-15 số');
      return;
    }

    try {
      dispatch(register({
        name,
        email,
        password,
        phoneNumber
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-[#151c32] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-[#1b2340] p-8 rounded-xl shadow-2xl border border-[#232b4a]">
        <div className="text-center">
          <FaUserShield className="mx-auto h-12 w-12 text-[#FFB85C]" />
          <h2 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Đăng ký Quản trị viên
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Hoặc{' '}
            <Link to="/admin/login" className="font-medium text-yellow-400 hover:text-yellow-500 transition-colors">
              đăng nhập nếu đã có tài khoản
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(error || registerError) && (
            <div className="text-[#FFB85C] text-sm text-center bg-[#3a1c1c] py-2 px-4 rounded-lg border border-[#ff8c8c] animate-shake">
              {error || registerError}
            </div>
          )}

          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <label className="ml-1 text-sm font-medium text-gray-300">
                <FaUser className="absolute mt-3 ml-3 h-5 w-5 text-[#FFB85C]" />
                <span className="ml-9">Tên hiển thị</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full pl-10 pr-3 py-2 bg-[#232b4a] border-2 border-[#FFB85C] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
                placeholder="Nhập tên hiển thị"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <label className="ml-1 text-sm font-medium text-gray-300">
                <FaEnvelope className="absolute mt-3 ml-3 h-5 w-5 text-[#FFB85C]" />
                <span className="ml-9">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full pl-10 pr-3 py-2 bg-[#232b4a] border-2 border-[#FFB85C] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="ml-1 text-sm font-medium text-gray-300">
                <FaLock className="absolute mt-3 ml-3 h-5 w-5 text-[#FFB85C]" />
                <span className="ml-9">Mật khẩu</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full pl-10 pr-10 py-2 bg-[#232b4a] border-2 border-[#FFB85C] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
                placeholder="••••••••"
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-[#FFB85C] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label className="ml-1 text-sm font-medium text-gray-300">
                <FaLock className="absolute mt-3 ml-3 h-5 w-5 text-[#FFB85C]" />
                <span className="ml-9">Xác nhận mật khẩu</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`mt-1 block w-full pl-10 pr-10 py-2 bg-[#232b4a] border-2 ${password && confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-[#FFB85C]'} rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-[#FFB85C] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-400">Mật khẩu không khớp</p>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="relative">
              <label className="ml-1 text-sm font-medium text-gray-300">
                <FaPhone className="absolute mt-3 ml-3 h-5 w-5 text-[#FFB85C]" />
                <span className="ml-9">Số điện thoại</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="mt-1 block w-full pl-10 pr-3 py-2 bg-[#232b4a] border-2 border-[#FFB85C] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-bold text-[#151c32] bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-400">
            Bằng cách đăng ký, bạn đồng ý với{' '}
            <Link to="#" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Điều khoản dịch vụ
            </Link>
            {' '}và{' '}
            <Link to="#" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Chính sách bảo mật
            </Link>
            {' '}của chúng tôi
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default AdminRegisterPage;
