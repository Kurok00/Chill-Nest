import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaStar, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaCrown,
  FaReply,
  FaSort,
  FaFlag,
  FaChartLine,
  FaDownload,
  FaSyncAlt,
  FaUsers,
  FaComments,
  FaTrendingUp,
  FaShieldAlt
} from 'react-icons/fa';
import {
  listReviews,
  deleteReview,
  updateReviewStatus,
  getReviewStats,
  resetReviewList
} from '../../actions/reviewActions';
import ReviewDetailsModalNew from './ReviewDetailsModalNew';
import ReviewResponseModal from './ReviewResponseModal';
import Loader from '../ui/Loader';
import Message from '../ui/Message';

const ReviewManagement = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    is_verified: '',
    is_reported: '',
    rating: '',
    property_type: ''
  });
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const reviewList = useSelector(state => state.reviewList);
  const { loading, error, reviews, totalPages, totalReviews } = reviewList;

  const reviewDelete = useSelector(state => state.reviewDelete);
  const { success: deleteSuccess } = reviewDelete;

  const reviewUpdateStatus = useSelector(state => state.reviewUpdateStatus);
  const { success: updateSuccess } = reviewUpdateStatus;

  const reviewStats = useSelector(state => state.reviewStats);
  const { stats } = reviewStats;

  useEffect(() => {
    dispatch(getReviewStats());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 10,
      ...filters
    };

    if (searchTerm) {
      params.search = searchTerm;
    }

    dispatch(listReviews(params));
  }, [dispatch, currentPage, filters, searchTerm, deleteSuccess, updateSuccess]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    const params = {
      page: 1,
      limit: 10,
      search: searchTerm,
      ...filters
    };
    dispatch(listReviews(params));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1);
  };

  const handleStatusUpdate = async (reviewId, statusData) => {
    try {
      await dispatch(updateReviewStatus(reviewId, statusData));
      showNotification('Trạng thái đánh giá đã được cập nhật');
    } catch (error) {
      showNotification('Có lỗi xảy ra khi cập nhật trạng thái', 'error');
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      try {
        await dispatch(deleteReview(reviewId));
        showNotification('Đánh giá đã được xóa thành công');
      } catch (error) {
        showNotification('Có lỗi xảy ra khi xóa đánh giá', 'error');
      }
    }
  };

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setShowDetailsModal(true);
  };

  const handleAddResponse = (review) => {
    setSelectedReview(review);
    setShowResponseModal(true);
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-amber-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
          {rating}
        </span>
      </div>
    );
  };

  const getStatusBadge = (review) => {
    const badges = [];
    
    if (review.is_verified) {
      badges.push(
        <span key="verified" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          <FaCheckCircle className="w-3 h-3 mr-1" />
          Đã xác thực
        </span>
      );
    }

    if (review.is_featured) {
      badges.push(
        <span key="featured" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
          <FaCrown className="w-3 h-3 mr-1" />
          Nổi bật
        </span>
      );
    }

    if (review.reported?.is_reported) {
      badges.push(
        <span key="reported" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          <FaFlag className="w-3 h-3 mr-1" />
          Bị báo cáo
        </span>
      );
    }

    return badges;
  };

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl transform transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-emerald-500 text-white' 
            : 'bg-red-500 text-white'
        } border-l-4 ${
          notification.type === 'success' ? 'border-emerald-300' : 'border-red-300'
        }`}>
          <div className="flex items-center">
            {notification.type === 'success' ? <FaCheckCircle className="mr-2" /> : <FaExclamationTriangle className="mr-2" />}
            {notification.message}
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Modern Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <FaChartLine className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Quản Lý Đánh Giá
                </h1>
                <p className="text-gray-600 mt-1">Theo dõi và kiểm duyệt đánh giá từ khách hàng</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => dispatch(getReviewStats())}
                className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <FaSyncAlt className="w-4 h-4 mr-2" />
                Làm mới
              </button>
              <button className="flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-all duration-200 hover:scale-105">
                <FaDownload className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng đánh giá</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalReviews}</p>
                  <p className="text-xs text-gray-500 mt-1">+{stats.recentReviews} trong 30 ngày</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <FaStar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã xác thực</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.verifiedReviews}</p>
                  <p className="text-xs text-emerald-600 mt-1">{stats.verificationRate}% tổng số</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                  <FaCheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bị báo cáo</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{stats.reportedReviews}</p>
                  <p className="text-xs text-red-600 mt-1">{stats.reportRate}% tổng số</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                  <FaExclamationTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Nổi bật</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{stats.featuredReviews}</p>
                  <p className="text-xs text-purple-600 mt-1">Đánh giá chất lượng</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <FaCrown className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Enhanced Search */}
            <div className="lg:col-span-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề, nội dung..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all"
                  />
                </div>
              </form>
            </div>

            {/* Enhanced Filters */}
            <div className="lg:col-span-2">
              <select
                value={filters.is_verified}
                onChange={(e) => handleFilterChange('is_verified', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-sm"
              >
                <option value="">Tất cả xác thực</option>
                <option value="true">Đã xác thực</option>
                <option value="false">Chưa xác thực</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-sm"
              >
                <option value="">Tất cả rating</option>
                <option value="5">5 sao</option>
                <option value="4">4+ sao</option>
                <option value="3">3+ sao</option>
                <option value="2">2+ sao</option>
                <option value="1">1+ sao</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <select
                value={filters.is_reported}
                onChange={(e) => handleFilterChange('is_reported', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-sm"
              >
                <option value="">Tất cả báo cáo</option>
                <option value="true">Bị báo cáo</option>
                <option value="false">Không báo cáo</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <button
                onClick={() => {
                  setFilters({
                    is_verified: '',
                    is_reported: '',
                    rating: '',
                    property_type: ''
                  });
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-medium"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Reviews Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nơi lưu trú
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Đánh giá
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nội dung
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews?.map((review, index) => (
                  <tr key={review._id} className={`hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-full border-2 border-white shadow-md"
                          src={review.user_id?.avatar || '/default-avatar.png'}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {review.user_id?.name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.user_id?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {review.property_id?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.property_id?.property_type} • {review.property_id?.location?.city}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {renderRatingStars(review.ratings?.overall || 0)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        <div className="font-semibold mb-1">{review.title}</div>
                        <div className="truncate text-gray-600">{review.comment}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {getStatusBadge(review)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(review)}
                          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all"
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleAddResponse(review)}
                          className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all"
                          title="Phản hồi"
                        >
                          <FaReply />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(review._id, { is_verified: !review.is_verified })}
                          className={`p-2 ${review.is_verified ? 'text-amber-600 hover:text-amber-900 hover:bg-amber-100' : 'text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100'} rounded-lg transition-all`}
                          title={review.is_verified ? 'Bỏ xác thực' : 'Xác thực'}
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all"
                          title="Xóa"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 px-6 py-4 flex items-center justify-between border-t border-white/20">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-6 py-3 border border-blue-200 text-sm font-medium rounded-xl text-blue-700 bg-white/80 backdrop-blur-sm hover:bg-blue-50 disabled:opacity-50 transition-all duration-200"
                >
                  Trước
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-6 py-3 border border-blue-200 text-sm font-medium rounded-xl text-blue-700 bg-white/80 backdrop-blur-sm hover:bg-blue-50 disabled:opacity-50 transition-all duration-200"
                >
                  Sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    Hiển thị <span className="font-bold text-blue-600">{((currentPage - 1) * 10) + 1}</span> đến{' '}
                    <span className="font-bold text-blue-600">{Math.min(currentPage * 10, totalReviews)}</span> trong{' '}
                    <span className="font-bold text-gray-900">{totalReviews}</span> đánh giá
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-xl shadow-lg -space-x-px">
                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const pageNumber = currentPage <= 3 ? index + 1 : currentPage - 2 + index;
                      if (pageNumber <= totalPages) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                              currentPage === pageNumber
                                ? 'z-10 bg-gradient-to-r from-blue-600 to-purple-600 border-blue-600 text-white shadow-lg transform scale-105'
                                : 'bg-white/80 backdrop-blur-sm border-blue-200 text-blue-700 hover:bg-blue-50 hover:scale-105'
                            } ${index === 0 ? 'rounded-l-xl' : ''} ${index === Math.min(totalPages, 5) - 1 || pageNumber === totalPages ? 'rounded-r-xl' : ''}`}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                      return null;
                    })}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showDetailsModal && selectedReview && (
        <ReviewDetailsModalNew
          review={selectedReview}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedReview(null);
          }}
          onUpdateStatus={handleStatusUpdate}
        />
      )}

      {showResponseModal && selectedReview && (
        <ReviewResponseModal
          review={selectedReview}
          onClose={() => {
            setShowResponseModal(false);
            setSelectedReview(null);
          }}
        />
      )}
    </div>
  );
};

export default ReviewManagement;
