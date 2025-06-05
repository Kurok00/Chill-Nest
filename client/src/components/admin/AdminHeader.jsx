import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../actions/adminActions';

const AdminHeader = ({ userName, profileImage }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutAdmin());
  };
  
  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/admin/dashboard">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <h1 className="text-2xl font-bold text-white ml-2">Chill-Nest <span className="text-blue-400">Admin</span></h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button 
                    className="p-1 rounded-full text-gray-400 hover:text-blue-400 focus:outline-none transition duration-150"
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  >
                    <span className="sr-only">Xem thông báo</span>
                    <div className="relative">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
                    </div>
                  </button>
                  
                  {isNotificationOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <h3 className="text-sm font-medium text-gray-200">Thông báo</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        <a href="#" className="block px-4 py-3 hover:bg-gray-700 transition duration-150">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <svg className="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-200">Đơn đặt phòng mới</p>
                              <p className="text-xs text-gray-400">Trần Văn B vừa đặt phòng tại Ocean Resort</p>
                              <p className="text-xs text-gray-500 mt-1">30 phút trước</p>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="block px-4 py-3 hover:bg-gray-700 transition duration-150">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-200">Thanh toán thành công</p>
                              <p className="text-xs text-gray-400">Đặt phòng #12345 đã được thanh toán</p>
                              <p className="text-xs text-gray-500 mt-1">2 giờ trước</p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <a href="#" className="block px-4 py-2 text-center text-xs font-medium text-blue-400 hover:text-blue-300 border-t border-gray-700">
                        Xem tất cả thông báo
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className="px-3 py-1 text-sm text-gray-300 hidden md:block">
              Xin chào, <span className="font-semibold text-blue-400">{userName || 'Admin'}</span>
            </span>
            <div className="relative">
              <div>
                <button
                  className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="sr-only">Mở menu người dùng</span>
                  <img
                    className="h-9 w-9 rounded-full border-2 border-blue-500 object-cover"
                    src={profileImage || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
                    alt="Ảnh đại diện"
                  />
                </button>
              </div>

              {isProfileMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium text-gray-200">{userName || 'Admin'}</p>
                    <p className="text-xs text-gray-400 truncate">admin@chillnest.com</p>
                  </div>
                  
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Thông tin cá nhân
                    </div>
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Cài đặt
                    </div>
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Đăng xuất
                    </div>
                  </button>
                </div>
              )}            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
