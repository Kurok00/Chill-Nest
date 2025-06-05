import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../actions/adminActions';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
    // Truy cập trạng thái từ Redux store
  const adminLogin = useSelector((state) => state.adminLogin);
  const { loading, error, adminInfo } = adminLogin || {};

  useEffect(() => {
    // Nếu admin đã đăng nhập, chuyển hướng đến trang admin dashboard
    if (adminInfo) {
      navigate('/admin/dashboard');
    }
  }, [adminInfo, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xóa trường nhập không cần thiết trước khi submit
    const formElements = e.target.elements;
    for (let element of formElements) {
      if (element.name === 'username' || element.name === 'password') {
        element.value = '';
      }
    }
    
    // Gửi thông tin đăng nhập
    dispatch(loginAdmin(email, password));
  };
  
  // Xử lý khi component mount để xóa dữ liệu tự điền
  useEffect(() => {
    // Đặt timeout để đảm bảo DOM đã load hoàn tất
    setTimeout(() => {
      const emailInput = document.getElementById('admin-email');
      const passwordInput = document.getElementById('password');
      
      if (emailInput && passwordInput) {
        emailInput.value = '';
        passwordInput.value = '';
        setEmail('');
        setPassword('');
      }
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Chill-Nest Admin</h1>
          <p className="text-gray-600 mt-2">Đăng nhập vào hệ thống quản trị</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}        {/* Hidden inputs để ngăn chặn trình duyệt tự điền */}
        <div style={{ display: 'none' }}>
          <input type="text" name="username" />
          <input type="password" name="password" />
        </div>

        <form onSubmit={handleSubmit} autoComplete="new-password">
          <div className="mb-6">
            <label htmlFor="admin-email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="admin-email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="new-password"
              name="admin_email_no_autofill"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required                autoComplete="new-password"
                name="admin_password_no_autofill"
                data-lpignore="true"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </span>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Liên hệ với quản trị viên nếu bạn cần trợ giúp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
