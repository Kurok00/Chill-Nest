import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaHeart, FaList, FaSearch, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, register, logout, resendOtp, verifyOtp } from '../../actions/userActions';
import OtpModal from '../ui/OtpModal';
import axios from 'axios';
import ForgotPasswordModal from '../ui/ForgotPasswordModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [registerShowPassword, setRegisterShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [pendingRegister, setPendingRegister] = useState(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);

  const dispatch = useDispatch();
  
  // Khôi phục cách truy cập state từ Redux
  const userLogin = useSelector((state) => state.userLogin || {});
  const { userInfo } = userLogin;
  // eslint-disable-next-line no-unused-vars
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (    <header className="bg-white shadow-md py-4 relative z-40">      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ChillNest
        </Link>
        
        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/homes" className="text-gray-700 hover:text-blue-600">
            Khách sạn
          </Link>
          <Link to="/homes?type=homestay" className="text-gray-700 hover:text-blue-600">
            Homestay
          </Link>
          <Link to="/promotions" className="text-gray-700 hover:text-blue-600">
            Ưu đãi
          </Link>
          <Link to="/blogs" className="text-gray-700 hover:text-blue-600">
            Blog
          </Link>
        </nav>
          {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button className="text-gray-700 hover:text-blue-600 hidden md:block">
            <FaSearch className="text-2xl md:text-3xl text-[#FFB085] hover:text-[#6C7BA3] transition-colors duration-200 drop-shadow-[0_2px_6px_rgba(255,176,133,0.18)] outline outline-1 outline-white rounded-full" />
          </button>
          
          {/* Wishlist */}
          <Link to="/wishlist" className="text-gray-700 hover:text-blue-600 hidden md:block">
            <FaHeart className="text-2xl md:text-3xl text-[#FF8C8C] hover:text-[#FFB085] transition-colors duration-200 drop-shadow-[0_2px_6px_rgba(255,140,140,0.18)] outline outline-1 outline-white rounded-full" />
          </Link>
          
          {/* My Bookings */}
          <Link to="/bookings" className="text-gray-700 hover:text-blue-600 hidden md:block">
            <FaList className="text-2xl md:text-3xl text-[#A3D8F4] hover:text-[#6C7BA3] transition-colors duration-200 drop-shadow-[0_2px_6px_rgba(163,216,244,0.18)] outline outline-1 outline-white rounded-full" />
          </Link>
            {/* Auth Buttons or Profile Menu */}
          {userInfo ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none"
              >
                {userInfo.user_name && (
                  <span className="mr-2 text-blue-600 hidden lg:block">
                    Xin chào, {userInfo.user_name}
                  </span>
                )}
                <FaUserCircle className="text-2xl md:text-3xl text-[#6C7BA3] hover:text-[#FFB085] transition-colors duration-200 drop-shadow-[0_2px_6px_rgba(108,123,163,0.18)] outline outline-1 outline-white rounded-full" />
              </button>
                {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Tài khoản của tôi
                  </Link>
                  <button 
                    onClick={() => {
                      dispatch(logout());
                      setIsProfileOpen(false);
                      // Hiển thị thông báo đăng xuất thành công
                      dispatch({
                        type: 'SET_NOTIFICATION',
                        payload: {
                          type: 'success',
                          message: 'Đăng xuất thành công!',
                        },
                      });
                    }} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthTab('login');
                  setLoginEmail('');
                  setLoginPassword('');
                  setLoginError('');
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
              >
                Đăng nhập
              </button>
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthTab('register');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </div>
        {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-inner">
          <div className="flex flex-col space-y-3">
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>

            <Link to="/homes" className="text-gray-700 py-2 border-b border-gray-100">
              Khách sạn
            </Link>
            <Link to="/homes?type=homestay" className="text-gray-700 py-2 border-b border-gray-100">
              Homestay
            </Link>
            <Link to="/promotions" className="text-gray-700 py-2 border-b border-gray-100">
              Ưu đãi
            </Link>            <Link to="/blogs" className="text-gray-700 py-2 border-b border-gray-100">
              Blog
            </Link>
            <Link to="/wishlist" className="text-gray-700 py-2 border-b border-gray-100">
              <FaHeart className="inline mr-2 text-[#FF8C8C] hover:text-[#FFB085] transition-colors duration-200 drop-shadow-[0_2px_6px_rgba(255,140,140,0.18)] outline outline-1 outline-white rounded-full" /> Danh sách yêu thích
            </Link>
            <Link to="/bookings" className="text-gray-700 py-2 border-b border-gray-100">
              <FaList className="inline mr-2 text-[#A3D8F4] hover:text-[#6C7BA3] transition-colors duration-200 drop-shadow-[0_2px_6px_rgba(163,216,244,0.18)] outline outline-1 outline-white rounded-full" /> Đơn đặt phòng của tôi
            </Link>
            
            {userInfo && (
              <button 
                onClick={() => {
                  dispatch(logout());
                  setIsMenuOpen(false);
                  dispatch({
                    type: 'SET_NOTIFICATION',
                    payload: {
                      type: 'success',
                      message: 'Đăng xuất thành công!',
                    },
                  });
                }}
                className="text-red-600 py-2 border-b border-gray-100 text-left"
              >
                Đăng xuất
              </button>
            )}
            
            {!userInfo && (
              <div className="flex flex-col space-y-2 pt-2">
                <button 
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthTab('login');
                    setIsMenuOpen(false);
                    setLoginEmail('');
                    setLoginPassword('');
                    setLoginError('');
                  }}
                  className="bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Đăng nhập
                </button>
                <button 
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthTab('register');
                    setIsMenuOpen(false);
                  }}
                  className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      )}      {/* Modal Auth */}
      {showAuthModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fadeIn"
          onClick={e => {
            if (e.target === e.currentTarget) {
              setModalClosing(true);
              setTimeout(() => {
                setShowAuthModal(false);
                setModalClosing(false);
              }, 250); // Giảm thời gian đóng modal
            }
          }}
        >
          <div
            className={`relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl ${modalClosing ? 'animate-modalOut' : 'animate-modalIn'} flex bg-[#1b2340] border border-[#232b4a]`}
            style={{ minHeight: 520 }}
          >
            {/* Left: Background + Logo + Slogan */}
            <div className="hidden md:flex flex-col justify-between w-1/2 bg-cover bg-center p-8 relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3')", backgroundColor: "rgb(37 99 235 / 1)"}}>
              <div></div>
              <div className="flex flex-col items-start relative z-10">
                <div className="flex items-center mb-4">
                  {/* <img src="/logo192.png" alt="ChillNest" className="w-14 h-14 mr-3 drop-shadow-xl" /> */}
                  <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(255,184,92,0.7)] tracking-wide" style={{textShadow: '0 2px 8px #000, 0 0 2px #FFB85C'}}>ChillNest</span>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(255,184,92,0.8)] mb-2" style={{textShadow: '0 2px 12px #000, 0 0 2px #fff'}}>Khám phá & đặt phòng khách sạn, homestay tuyệt vời nhất</p>
                <ul className="text-lg font-semibold space-y-1 mt-2">
                  <li className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"><span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">✔️ Giá tốt nhất, nhiều ưu đãi</span></li>
                  <li className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"><span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">✔️ Đặt phòng nhanh chóng, an toàn</span></li>
                  <li className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"><span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">✔️ Hỗ trợ 24/7, đánh giá thực tế</span></li>
                </ul>
              </div>
              <div></div>
              {/* Overlay gradient tối hơn */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#151c32]/90 via-[#1b2340]/80 to-[#232b4a]/80"></div>
            </div>
            {/* Right: Form */}
            <div className="w-full md:w-1/2 bg-[#232b4a] p-8 flex flex-col justify-center relative animate-slideInRight">
              <button onClick={() => {
                setModalClosing(true);
                setTimeout(() => {
                  setShowAuthModal(false);
                  setModalClosing(false);
                }, 250);
              }} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#232b4a] hover:bg-[#FFB85C]/20 text-gray-400 hover:text-[#FFB85C] transition-colors text-xl shadow z-10">×</button>
              <div className="flex mb-6 border-b border-[#232b4a]">
                <button className={`flex-1 py-3 text-lg font-semibold transition-all ${authTab==='login' ? 'border-b-2 border-[#FFB85C] text-[#FFB85C] bg-[#232b4a]' : 'text-gray-300 bg-transparent hover:text-[#FFB85C]/80'}`} onClick={()=>{
                  setAuthTab('login');
                  setLoginEmail('');
                  setLoginPassword('');
                  setLoginError('');
                }}>
                  Đăng nhập
                </button>
                <button className={`flex-1 py-3 text-lg font-semibold transition-all ${authTab==='register' ? 'border-b-2 border-[#FFB85C] text-[#FFB85C] bg-[#232b4a]' : 'text-gray-300 bg-transparent hover:text-[#FFB85C]/80'}`} onClick={()=>{
                  setAuthTab('register');
                  setRegisterName('');
                  setRegisterEmail('');
                  setRegisterPassword('');
                  setRegisterConfirmPassword('');
                  setRegisterPhone('');
                  setRegisterError('');
                }}>
                  Đăng ký
                </button>
              </div>
              <div>
                {authTab==='login' ? (
                  <form onSubmit={async e => {
                    e.preventDefault();
                    setLoginError('');
                    if (!loginEmail.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
                      setLoginError('Email không hợp lệ!');
                      return;
                    }
                    if (loginPassword.length < 6) {
                      setLoginError('Mật khẩu phải từ 6 ký tự!');
                      return;
                    }
                    try {
                      await dispatch(login(loginEmail, loginPassword));
                      // Chỉ thực hiện các bước sau nếu đăng nhập thành công (không có lỗi)
                      setLoginEmail('');
                      setLoginPassword('');
                      setShowAuthModal(false);
                      dispatch({
                        type: 'SET_NOTIFICATION',
                        payload: { type: 'success', message: 'Đăng nhập thành công!' },
                      });
                    } catch (error) {
                      // Ưu tiên message backend trả về, fallback sang lỗi mặc định
                      const msg = error?.response?.data?.message || error.message || 'Đăng nhập thất bại';
                      setLoginError(msg === 'Request failed with status code 401' || msg === 'Unauthorized' 
                        ? 'Email hoặc mật khẩu không đúng!' 
                        : msg);
                      // Không đóng modal khi có lỗi
                    }
                  }}>
                    {loginError && (
                      <div className="mb-2 p-2 bg-[#3a1c1c] border border-[#ff8c8c] rounded-md text-[#FFB85C] text-sm">
                        <strong>Lỗi đăng nhập:</strong> {loginError}
                      </div>
                    )}
                    {/* Nếu không có loginError, kiểm tra lỗi từ redux */}
                    {!loginError && userLogin.error && (
                      <div className="mb-2 p-2 bg-[#3a1c1c] border border-[#ff8c8c] rounded-md text-[#FFB85C] text-sm">
                        <strong>Lỗi đăng nhập:</strong> {
                          userLogin.error === 'Request failed with status code 401' || userLogin.error === 'Unauthorized' ?
                          'Email hoặc mật khẩu không đúng!'
                          : userLogin.error
                        }
                      </div>
                    )}
                    <div className="mb-4">
                      <label className="block mb-1 text-gray-300 font-semibold">Email</label>
                      <input type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} required className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none" placeholder="Nhập email..." />
                    </div>
                    <div className="mb-4 relative">
                      <label className="block mb-1 text-gray-300 font-semibold">Mật khẩu</label>
                      <input type={loginShowPassword ? 'text' : 'password'} value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} required className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white pr-10 placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none" placeholder="Nhập mật khẩu..." />
                      <span className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-[#FFB85C]" onClick={()=>setLoginShowPassword(v=>!v)}>
                        {loginShowPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <div className="mb-4 text-right">
                      <span
                        className="text-sm text-[#FFB85C] hover:text-yellow-500 font-semibold cursor-pointer"
                        onClick={() => {
                          setShowAuthModal(false);
                          setShowForgotModal(true);
                        }}
                      >
                        Quên mật khẩu?
                      </span>
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-[#151c32] py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 font-extrabold text-lg shadow-lg transition-all" disabled={userLogin.loading}>
                      {userLogin.loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                    <div className="mt-4 text-center text-xs text-gray-400">
                      Bằng cách đăng nhập, bạn đồng ý với <span className="text-[#FFB85C] cursor-pointer font-semibold">Điều khoản dịch vụ</span> và <span className="text-[#FFB85C] cursor-pointer font-semibold">Chính sách bảo mật</span> của chúng tôi.
                    </div>
                  </form>
                ) : (
                  <form onSubmit={async e => {
                    e.preventDefault();
                    setRegisterError('');
                    if (!registerName.trim()) {
                      setRegisterError('Tên không được để trống!');
                      return;
                    }
                    if (!registerEmail.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
                      setRegisterError('Email không hợp lệ!');
                      return;
                    }
                    if (registerPassword.length < 6) {
                      setRegisterError('Mật khẩu phải từ 6 ký tự!');
                      return;
                    }
                    if (registerPassword !== registerConfirmPassword) {
                      setRegisterError('Mật khẩu nhập lại không khớp!');
                      return;
                    }
                    if (registerPhone && !/^\d{8,15}$/.test(registerPhone)) {
                      setRegisterError('Số điện thoại phải là số và từ 8-15 ký tự!');
                      return;
                    }
                    try {
                      // Use the existing register endpoint but make sure
                      // we treat the account as pending until OTP verification
                      await axios.post('/api/users/register', {
                        user_name: registerName,
                        email: registerEmail,
                        password: registerPassword,
                        phone_number: registerPhone
                      });
                      setPendingRegister({
                        user_name: registerName,
                        email: registerEmail,
                        password: registerPassword,
                        phone_number: registerPhone
                      });
                      setShowAuthModal(false);
                      setShowOtpModal(true);
                      setOtpError('');
                      setRegisterName('');
                      setRegisterEmail('');
                      setRegisterPassword('');
                      setRegisterConfirmPassword('');
                      setRegisterPhone('');
                    } catch (error) {
                      // Không đóng modal nếu lỗi
                      const backendMsg = error.response?.data?.message;
                      const msg = backendMsg?.toLowerCase() || '';
                      if (msg.includes('người dùng đã tồn tại')) {
                        setRegisterError(backendMsg);
                      } else if (msg.includes('email')) {
                        setRegisterError(backendMsg);
                      } else if (msg.includes('phone')) {
                        setRegisterError(backendMsg);
                      } else if (msg.includes('tồn tại') || msg.includes('exist')) {
                        setRegisterError(backendMsg);
                      } else if (backendMsg) {
                        setRegisterError(backendMsg);
                      } else {
                        setRegisterError('Đăng ký thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ!');
                      }
                    }
                  }}>
                    {registerError && <div className="mb-2 text-[#FFB85C] text-sm">{registerError}</div>}
                    <div className="mb-4">
                      <label className="block mb-1 text-gray-300 font-semibold">Tên người dùng</label>
                      <input
                        type="text"
                        value={registerName}
                        onChange={async e => {
                          setRegisterName(e.target.value);
                          setRegisterError("");
                        }}
                        onBlur={async () => {
                          if (registerName.trim()) {
                            try {
                              const res = await axios.post('/api/users/check-unique', { user_name: registerName });
                              if (res.data.exists.user_name) {
                                setRegisterError('Tên người dùng đã tồn tại. Vui lòng chọn tên khác!');
                              }
                            } catch (err) {
                              const msg = err.response?.data?.message;
                              if (msg) setRegisterError(msg);
                            }
                          }
                        }}
                        required
                        className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
                        placeholder="Nhập tên..."
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 text-gray-300 font-semibold">Email</label>
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={async e => {
                          setRegisterEmail(e.target.value);
                          setRegisterError("");
                        }}
                        onBlur={async () => {
                          if (registerEmail.trim()) {
                            try {
                              const res = await axios.post('/api/users/check-unique', { email: registerEmail });
                              if (res.data.exists.email) {
                                setRegisterError('Email đã được sử dụng. Vui lòng dùng email khác!');
                              }
                            } catch (err) {
                              const msg = err.response?.data?.message;
                              if (msg) setRegisterError(msg);
                            }
                          }
                        }}
                        required
                        className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
                        placeholder="Nhập email..."
                      />
                    </div>
                    <div className="mb-4 relative">
                      <label className="block mb-1 text-gray-300 font-semibold">Mật khẩu</label>
                      <input type={registerShowPassword ? 'text' : 'password'} value={registerPassword} onChange={e=>setRegisterPassword(e.target.value)} required className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white pr-10 placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none" placeholder="Nhập mật khẩu..." />
                      <span className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-[#FFB85C]" onClick={()=>setRegisterShowPassword(v=>!v)}>
                        {registerShowPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <div className="mb-4 relative">
                      <label className="block mb-1 text-gray-300 font-semibold">Nhập lại mật khẩu</label>
                      <input type={registerShowPassword ? 'text' : 'password'} value={registerConfirmPassword} onChange={e=>setRegisterConfirmPassword(e.target.value)} required className={`w-full px-3 py-2 border-2 ${registerConfirmPassword && registerPassword !== registerConfirmPassword ? 'border-red-500' : 'border-[#FFB85C]'} rounded-lg bg-[#232b4a] text-white pr-10 placeholder-yellow-200 focus:ring-2 focus:ring-${registerConfirmPassword && registerPassword !== registerConfirmPassword ? 'red-500' : '[#FFB85C]'} focus:border-${registerConfirmPassword && registerPassword !== registerConfirmPassword ? 'red-500' : 'yellow-400'} shadow-md transition-all outline-none`} placeholder="Nhập lại mật khẩu..." />
                      <span className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-[#FFB85C]" onClick={()=>setRegisterShowPassword(v=>!v)}>
                        {registerShowPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      {registerConfirmPassword && registerPassword !== registerConfirmPassword && (
                        <div className="text-red-400 text-xs mt-1">Mật khẩu nhập lại không khớp</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 text-gray-300 font-semibold">Số điện thoại</label>
                      <input
                        type="text"
                        value={registerPhone}
                        onChange={async e => {
                          setRegisterPhone(e.target.value);
                          setRegisterError("");
                        }}
                        onBlur={async () => {
                          if (registerPhone.trim()) {
                            try {
                              const res = await axios.post('/api/users/check-unique', { phone_number: registerPhone });
                              if (res.data.exists.phone_number) {
                                setRegisterError('Số điện thoại đã được sử dụng. Vui lòng dùng số khác!');
                              }
                            } catch (err) {
                              const msg = err.response?.data?.message;
                              if (msg) setRegisterError(msg);
                            }
                          }
                        }}
                        className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none"
                        placeholder="Nhập số điện thoại..."
                      />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-[#151c32] py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 font-extrabold text-lg shadow-lg transition-all">Đăng ký</button>
                    <div className="mt-4 text-center text-xs text-gray-400">
                      Bằng cách đăng ký, bạn đồng ý với <span className="text-[#FFB85C] cursor-pointer font-semibold">Điều khoản dịch vụ</span> và <span className="text-[#FFB85C] cursor-pointer font-semibold">Chính sách bảo mật</span> của chúng tôi.
                    </div>
                  </form>
                )}
              </div>
            </div>
            <style>{`
              .animate-fadeIn { animation: fadeIn .3s; }
              .animate-modalIn { animation: modalIn .4s cubic-bezier(.4,2,.6,1); }
              .animate-modalOut { animation: modalOut .25s cubic-bezier(.4,2,.6,1); }
              .animate-slideInRight { animation: slideInRight .5s cubic-bezier(.4,2,.6,1); }
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes modalIn { from { transform: scale(.92) translateY(40px); opacity: 0; } to { transform: none; opacity: 1; } }
              @keyframes modalOut { from { transform: none; opacity: 1; } to { transform: scale(.92) translateY(40px); opacity: 0; } }
              @keyframes slideInRight { from { transform: translateX(60px); opacity: 0; } to { transform: none; opacity: 1; } }
            `}</style>
          </div>
        </div>
      )}
      {/* OtpModal hiển thị sau khi đăng ký */}
      {showOtpModal && pendingRegister && (
        <OtpModal
          email={pendingRegister.email}
          user_name={pendingRegister.user_name}
          error={otpError}
          onClose={() => {
            setShowOtpModal(false);
            setPendingRegister(null);
          }}
          onSubmit={async (otp) => {
            setOtpError('');
            try {
              // Use the existing verify-otp endpoint
              const { data } = await axios.post('/api/users/verify-otp', {
                ...pendingRegister,
                otp
              });
              // Đăng nhập thành công, lưu userInfo vào redux
              dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
              setShowOtpModal(false);
              setPendingRegister(null);
              dispatch({
                type: 'SET_NOTIFICATION',
                payload: {
                  type: 'success',
                  message: 'Đăng ký và xác thực thành công!'
                },
              });
            } catch (error) {
              setOtpError(error.response?.data?.message || 'OTP không đúng hoặc đã hết hạn!');
            }
          }}
          onResend={async () => {
            setOtpError('');
            try {
              await dispatch(resendOtp(pendingRegister));
              dispatch({
                type: 'SET_NOTIFICATION',
                payload: {
                  type: 'success',
                  message: 'Đã gửi lại mã OTP!'
                },
              });
            } catch (error) {
              setOtpError(error.response?.data?.message || 'Không gửi lại được OTP!');
            }
          }}
        />
      )}
      {/* Modal Quên mật khẩu */}
      <ForgotPasswordModal show={showForgotModal} onClose={() => setShowForgotModal(false)} />
    </header>
  );
};

export default Header;
