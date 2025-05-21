import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../actions/userActions';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const passwordReset = useSelector((state) => state.passwordReset);
  const { loading, success, error } = passwordReset;
  
  useEffect(() => {
    if (success) {
      setShowSuccess(true);
    }
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage('');
    
    // Validate password
    if (password.length < 6) {
      setMessage('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    
    if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp');
      return;
    }
    
    dispatch(resetPassword(token, password));
  };

  // Xử lý lỗi token hết hạn/hỏng UX thân thiện
  const isTokenError = error && (
    error.toLowerCase().includes('token') ||
    error.toLowerCase().includes('hết hạn') ||
    error.toLowerCase().includes('invalid')
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#151c32] via-[#232b4a] to-[#1b2340]">
      <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#232b4a] border border-[#232b4a] p-8 animate-modalIn">
        <h2 className="text-2xl font-bold text-[#FFB85C] mb-2 text-center">Đặt lại mật khẩu</h2>
        <p className="text-gray-300 text-center mb-6">Vui lòng nhập mật khẩu mới của bạn</p>
        {message && (
          <div className="mb-2 text-red-400 text-sm text-center">{message}</div>
        )}
        {error && (
          <div className="mb-2 text-red-400 text-sm text-center">{error}</div>
        )}
        {isTokenError ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" fill="#fff"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6M9 9l6 6" /></svg>
            <p className="text-2xl font-bold text-[#ef4444] mb-2">Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ</p>
            <p className="text-base text-gray-200 mb-4">Vui lòng gửi lại yêu cầu quên mật khẩu để nhận liên kết mới.</p>
            <Link to="/forgot-password" className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-[#151c32] font-bold shadow-lg hover:from-yellow-500 hover:to-orange-500 transition-all">Gửi lại yêu cầu</Link>
          </div>
        ) : showSuccess ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="#fff"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" /></svg>
            <p className="text-2xl font-bold text-[#22c55e] mb-2">Mật khẩu đã đổi thành công</p>
            <p className="text-base text-gray-200 mb-2">Bạn có thể tắt trang web này.</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block mb-1 text-gray-300 font-semibold">Mật khẩu mới</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white pr-10 placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
                placeholder="Nhập mật khẩu mới..."
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-[#FFB85C]" onClick={()=>setShowPassword(v=>!v)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="confirm-password" className="block mb-1 text-gray-300 font-semibold">Nhập lại mật khẩu</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                className={`w-full px-3 py-2 border-2 ${confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-[#FFB85C]'} rounded-lg bg-[#232b4a] text-white pr-10 placeholder-yellow-200 focus:ring-2 focus:ring-${confirmPassword && password !== confirmPassword ? 'red-500' : '[#FFB85C]'} focus:border-${confirmPassword && password !== confirmPassword ? 'red-500' : 'yellow-400'} shadow-md transition-all outline-none`}
                placeholder="Nhập lại mật khẩu mới..."
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <span className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-[#FFB85C]" onClick={()=>setShowPassword(v=>!v)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {confirmPassword && password !== confirmPassword && (
                <div className="text-red-400 text-xs mt-1">Mật khẩu nhập lại không khớp</div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-[#151c32] py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 font-extrabold text-lg shadow-lg transition-all mt-2"
            >
              {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
            </button>
            <div className="flex items-center justify-center mt-4">
              <Link to="/login" className="text-sm text-[#FFB85C] hover:text-yellow-500 font-semibold">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        )}
        <style>{`
          .animate-modalIn { animation: modalIn .4s cubic-bezier(.4,2,.6,1); }
          @keyframes modalIn { from { transform: scale(.92) translateY(40px); opacity: 0; } to { transform: none; opacity: 1; } }
        `}</style>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
