import React from 'react';
import { 
  FaTimes, 
  FaStar, 
  FaCheckCircle, 
  FaCrown, 
  FaFlag, 
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaHome,
  FaHeart,
  FaReply
} from 'react-icons/fa';

const ReviewDetailsModalNew = ({ review, onClose, onUpdateStatus }) => {
  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-amber-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">{rating}/5</span>
      </div>
    );
  };

  const handleStatusToggle = (field, currentValue) => {
    onUpdateStatus(review._id, { [field]: !currentValue });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto border border-white/20">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-8 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <FaStar className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">Chi Tiết Đánh Giá</h2>
                <p className="text-blue-200 opacity-90">Xem và quản lý đánh giá từ khách hàng</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all duration-200 border border-white/30 hover:scale-105"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Review Overview Card */}
          <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-white/50 shadow-lg backdrop-blur-sm">{/* Review Overview Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaUser className="w-5 h-5 mr-2 text-blue-600" />
                  Thông Tin Khách Hàng
                </h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={review.user_id?.avatar || '/default-avatar.png'}
                    alt=""
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{review.user_id?.name || 'N/A'}</p>
                    <p className="text-gray-600">{review.user_id?.email}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <FaCalendarAlt className="w-4 h-4 mr-1" />
                      {new Date(review.created_at).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaHome className="w-5 h-5 mr-2 text-green-600" />
                  Thông Tin Nơi Lưu Trú
                </h3>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{review.property_id?.name || 'N/A'}</p>
                  <p className="text-gray-600 capitalize">{review.property_id?.property_type}</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                    {review.property_id?.location?.city}, {review.property_id?.location?.country || 'Vietnam'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Review Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Review Content - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Rating Breakdown */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FaStar className="w-5 h-5 mr-2 text-amber-500" />
                  Đánh Giá Chi Tiết
                </h3>
                
                {/* Overall Rating */}
                <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-xl border border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-700">Tổng Quan</span>
                    {renderRatingStars(review.ratings?.overall || 0)}
                  </div>
                </div>

                {/* Detailed Ratings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'cleanliness', label: 'Vệ sinh', icon: '🧹' },
                    { key: 'accuracy', label: 'Độ chính xác', icon: '✅' },
                    { key: 'location', label: 'Vị trí', icon: '📍' },
                    { key: 'value', label: 'Giá trị', icon: '💰' },
                    { key: 'check_in', label: 'Check-in', icon: '🏠' }
                  ].map(({ key, label, icon }) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 flex items-center">
                        <span className="mr-2">{icon}</span>
                        {label}
                      </span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`w-4 h-4 ${
                              star <= (review.ratings?.[key] || 0) ? 'text-amber-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-bold text-gray-800">
                          {review.ratings?.[key] || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Title & Comment */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Nội Dung Đánh Giá</h3>
                
                {review.title && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 bg-blue-50 p-3 rounded-lg">
                      "{review.title}"
                    </h4>
                  </div>
                )}

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-4 rounded-lg italic">
                    "{review.comment}"
                  </p>
                </div>

                {review.tips_for_travelers && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">💡 Lời khuyên cho du khách:</h5>
                    <p className="text-green-700">{review.tips_for_travelers}</p>
                  </div>
                )}
              </div>

              {/* Host Response */}
              {review.host_response?.comment && (
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                    <FaReply className="w-5 h-5 mr-2" />
                    Phản Hồi Từ Chủ Nhà
                  </h3>
                  <p className="text-blue-700 leading-relaxed">{review.host_response.comment}</p>
                  <p className="text-sm text-blue-600 mt-3">
                    Phản hồi vào: {new Date(review.host_response.responded_at).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              )}
            </div>

            {/* Status & Actions - Takes 1 column */}
            <div className="space-y-6">
              {/* Review Stats */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống Kê</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Lượt thích</span>
                    <span className="flex items-center text-pink-600">
                      <FaHeart className="w-4 h-4 mr-1" />
                      {review.helpful_votes || 0}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Loại chuyến đi</span>
                    <span className="text-sm font-medium text-gray-800 capitalize">
                      {review.trip_type || 'N/A'}
                    </span>
                  </div>

                  {review.stay_date && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Ngày lưu trú</span>
                      <span className="text-sm font-medium text-gray-800">
                        {new Date(review.stay_date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badges */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Trạng Thái</h3>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg border-2 ${
                    review.is_verified 
                      ? 'bg-emerald-50 border-emerald-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm font-medium">
                        <FaCheckCircle className={`w-4 h-4 mr-2 ${
                          review.is_verified ? 'text-emerald-600' : 'text-gray-400'
                        }`} />
                        Đã xác thực
                      </span>
                      <button
                        onClick={() => handleStatusToggle('is_verified', review.is_verified)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          review.is_verified
                            ? 'bg-emerald-200 text-emerald-800 hover:bg-emerald-300'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {review.is_verified ? 'Bỏ xác thực' : 'Xác thực'}
                      </button>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border-2 ${
                    review.is_featured 
                      ? 'bg-purple-50 border-purple-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm font-medium">
                        <FaCrown className={`w-4 h-4 mr-2 ${
                          review.is_featured ? 'text-purple-600' : 'text-gray-400'
                        }`} />
                        Nổi bật
                      </span>
                      <button
                        onClick={() => handleStatusToggle('is_featured', review.is_featured)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          review.is_featured
                            ? 'bg-purple-200 text-purple-800 hover:bg-purple-300'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {review.is_featured ? 'Bỏ nổi bật' : 'Đặt nổi bật'}
                      </button>
                    </div>
                  </div>

                  {review.reported?.is_reported && (
                    <div className="p-3 rounded-lg border-2 bg-red-50 border-red-200">
                      <div className="flex items-center text-sm font-medium text-red-800 mb-2">
                        <FaFlag className="w-4 h-4 mr-2" />
                        Bị báo cáo
                      </div>
                      <p className="text-xs text-red-600">
                        Lý do: {review.reported.report_reason}
                      </p>
                      <p className="text-xs text-red-500 mt-1">
                        Ngày báo cáo: {new Date(review.reported.report_date).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaCheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Thao Tác Nhanh
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleStatusToggle('is_verified', review.is_verified)}
                    className={`w-full px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 ${
                      review.is_verified 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white'
                    }`}
                  >
                    {review.is_verified ? '❌ Bỏ xác thực' : '✅ Xác thực đánh giá'}
                  </button>
                  
                  <button
                    onClick={() => handleStatusToggle('is_featured', review.is_featured)}
                    className={`w-full px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 ${
                      review.is_featured
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'
                    }`}
                  >
                    {review.is_featured ? '👑 Bỏ nổi bật' : '⭐ Đặt nổi bật'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 px-8 py-6 rounded-b-3xl border-t border-white/50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">ID đánh giá:</span> 
              <span className="font-mono font-bold ml-2 px-3 py-1 bg-white/60 rounded-lg text-blue-700">{review._id}</span>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 hover:from-slate-800 hover:via-blue-800 hover:to-indigo-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailsModalNew;
