import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../actions/adminActions';

const AdminSidebar = ({ activeTab, setActiveTab, userName, profileImage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/admin/login');
  };

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Bảng điều khiển',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      path: '/admin/dashboard'
    },
    {
      id: 'users',
      name: 'Quản lý người dùng',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      path: '/admin/users'
    },
    {
      id: 'reviews',
      name: 'Quản lý đánh giá',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      path: '/admin/reviews'
    },
    {
      id: 'advertisements',
      name: 'Quản lý quảng cáo',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      path: '/admin/advertisements'
    },
    {
      id: 'properties',
      name: 'Quản lý khách sạn',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      path: '/admin/properties'
    },
    {
      id: 'rooms',
      name: 'Quản lý phòng',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/admin/rooms'
    }
  ];

  return (
    <aside className={`h-screen bg-gray-900 ${isCollapsed ? 'w-20' : 'w-64'} shadow-xl hidden sm:block sticky top-0 transition-all duration-300 ease-in-out z-10`}>
      {/* Toggle collapse button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-5 bg-gray-800 text-gray-300 hover:text-white p-1 rounded-full shadow-lg border border-gray-700"
      >
        <svg
          className={`h-4 w-4 transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`
                  ${activeTab === item.id
                    ? 'bg-gray-800 text-white border-l-4 border-blue-500'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  } 
                  group flex items-center px-2 py-2 text-base font-medium rounded-md w-full transition-all duration-200
                `}
                onClick={() => setActiveTab(item.id)}
              >
                <svg
                  className={`
                    ${activeTab === item.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}
                    ${isCollapsed ? 'mx-auto' : 'mr-3'} 
                    h-6 w-6 transition-colors duration-200
                  `}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {item.icon}
                </svg>
                {!isCollapsed && <span className="transition-opacity duration-200">{item.name}</span>}
              </Link>
            </li>
          ))}
        </div>
      </nav>

      {/* User profile section */}
      <div className={`absolute bottom-0 w-full border-t border-gray-800 p-4 ${isCollapsed ? 'text-center' : ''}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'mb-4'}`}>
          <img
            className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-700"
            src={profileImage || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
            alt="Ảnh đại diện"
          />
          {!isCollapsed && (
            <span className="ml-2 text-sm font-medium text-gray-300">{userName || 'Admin'}</span>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg
              className="mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Đăng xuất
          </button>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
