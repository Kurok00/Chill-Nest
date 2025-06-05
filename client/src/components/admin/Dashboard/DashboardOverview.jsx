import React from 'react';

const DashboardOverview = ({ stats }) => {
  // Format số tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Format ngày giờ
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  // Xác định trạng thái đặt phòng
  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Map trạng thái sang tiếng Việt
  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Đang chờ';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tổng quan</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tổng người dùng</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tổng đặt phòng</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <svg className="h-8 w-8 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <svg className="h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tổng chỗ ở</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProperties.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Người dùng mới nhất</h3>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {stats.recentUsers.map((user) => (
                <li key={user.id} className="py-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                        alt={user.user_name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.user_name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500">
                      {formatDate(user.created_at)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Xem tất cả người dùng
              </button>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Đặt phòng gần đây</h3>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {stats.recentBookings.map((booking) => (
                <li key={booking.id} className="py-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{booking.user_name}</p>
                      <p className="text-sm text-gray-500 truncate">{booking.property_name}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-900 font-medium">
                      {formatCurrency(booking.amount)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Xem tất cả đặt phòng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
