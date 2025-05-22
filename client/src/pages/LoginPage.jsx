import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error } = userLogin;
  
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(identifier, password));
  };
  
  return (
    <div className="w-full md:w-1/2 bg-[#232b4a] p-8 flex flex-col justify-center relative animate-slideInRight">
      <button className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#232b4a] hover:bg-[#FFB85C]/20 text-gray-400 hover:text-[#FFB85C] transition-colors text-xl shadow z-10">
        ×
      </button>

      <div className="flex mb-6 border-b border-[#232b4a]">
        <button 
          className={`flex-1 py-3 text-lg font-semibold transition-all ${
            activeTab === 'login' 
              ? 'border-b-2 border-[#FFB85C] text-[#FFB85C]' 
              : 'text-gray-300 hover:text-[#FFB85C]/80'
          } bg-[#232b4a]`}
          onClick={() => setActiveTab('login')}
        >
          Đăng nhập
        </button>
        <button 
          className={`flex-1 py-3 text-lg font-semibold transition-all ${
            activeTab === 'register'
              ? 'border-b-2 border-[#FFB85C] text-[#FFB85C]'
              : 'text-gray-300 hover:text-[#FFB85C]/80'
          } bg-transparent`}
          onClick={() => navigate('/register')}
        >
          Đăng ký
        </button>
      </div>

      <div>
        {error && (
          <div className="mb-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-300 font-semibold">
              Email
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
              placeholder="Nhập email..."
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-1 text-gray-300 font-semibold">
              Mật khẩu
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white pr-10 placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span 
              className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-[#FFB85C]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-sm text-[#FFB85C] hover:text-yellow-500 font-semibold cursor-pointer">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-[#151c32] py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 font-extrabold text-lg shadow-lg transition-all"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>

          <div className="mt-4 text-center text-xs text-gray-400">
            Bằng cách đăng nhập, bạn đồng ý với{' '}
            <span className="text-[#FFB85C] cursor-pointer font-semibold">
              Điều khoản dịch vụ
            </span>{' '}
            và{' '}
            <span className="text-[#FFB85C] cursor-pointer font-semibold">
              Chính sách bảo mật
            </span>{' '}
            của chúng tôi.
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
