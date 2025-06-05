import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

/**
 * Higher-order component để bảo vệ các routes admin
 * @param {React.Component} Component - Component cần bảo vệ
 * @returns {React.Component} Protected Component
 */
const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin || {};

  useEffect(() => {
    // Nếu không có thông tin admin hoặc không phải là admin, chuyển hướng đến trang đăng nhập admin
    if (!adminInfo || adminInfo.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [adminInfo, navigate]);

  // Nếu đã đăng nhập và là admin, hiển thị component con
  return adminInfo && adminInfo.role === 'admin' ? children : null;
};

export default AdminProtectedRoute;
