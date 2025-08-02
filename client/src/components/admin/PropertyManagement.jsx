import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api/admin/properties';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    property_type: 'hotel',
    location: { address: { city: '', province: '' }, coordinates: { latitude: '', longitude: '' } },
    price_range: { min: '', max: '' },
    star_rating: 0,
    images: [],
    amenities: [],
  });

  // Fetch properties
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      console.log('Fetching properties with token:', token);
      const res = await axios.get(API_URL, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      console.log('Fetched properties:', res);
      setProperties(res.data);
      console.log('Properties loaded successfully:', res);
      console.log('Properties:', token);
      setError('');
    } catch (err) {
      setError('Lỗi tải danh sách khách sạn');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setFormData({ ...formData, location: { ...formData.location, address: { ...formData.location.address, [field]: value } } });
    } else if (name.startsWith('price_range.')) {
      const field = name.split('.')[1];
      setFormData({ ...formData, price_range: { ...formData.price_range, [field]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };
      
      if (editProperty) {
        await axios.put(`${API_URL}/${editProperty._id}`, formData, { headers });
      } else {
        await axios.post(API_URL, formData, { headers });
      }
      setShowForm(false);
      setEditProperty(null);
      setFormData({
        name: '', description: '', property_type: 'hotel', location: { address: { city: '', province: '' }, coordinates: { latitude: '', longitude: '' } }, price_range: { min: '', max: '' }, star_rating: 0, images: [], amenities: [],
      });
      fetchProperties();
    } catch (err) {
      setError('Lỗi lưu thông tin khách sạn');
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = (property) => {
    setEditProperty(property);
    setFormData({ ...property });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa khách sạn này?')) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchProperties();
    } catch (err) {
      setError('Lỗi xóa khách sạn');
    }
    setLoading(false);
  };

  // Loading state
  if (loading && properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Quản lý khách sạn</h2>
        <div className="mt-4 flex justify-end">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200" 
            onClick={() => { setShowForm(true); setEditProperty(null); }}
          >
            <FaPlus className="mr-2" /> Thêm khách sạn
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Lỗi!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Danh sách khách sạn</h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tên</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Loại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Thành phố</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tỉnh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Giá từ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sao</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {properties.map((p) => (
                  <tr key={p._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{p.property_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{p.location?.address?.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{p.location?.address?.province}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {p.price_range?.min ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price_range.min) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{p.star_rating}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-blue-400 hover:text-blue-300 mr-3 transition-colors duration-200" 
                        onClick={() => handleEdit(p)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300 transition-colors duration-200" 
                        onClick={() => handleDelete(p._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Form thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {editProperty ? 'Sửa khách sạn' : 'Thêm khách sạn'}
                </h3>
              </div>
              
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách sạn</label>
                  <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
                  <select 
                    name="property_type" 
                    value={formData.property_type} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="hotel">Khách sạn</option>
                    <option value="homestay">Homestay</option>
                    <option value="resort">Resort</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Căn hộ</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thành phố</label>
                    <input 
                      name="location.city" 
                      value={formData.location.address.city} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh</label>
                    <input 
                      name="location.province" 
                      value={formData.location.address.province} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá từ</label>
                    <input 
                      name="price_range.min" 
                      value={formData.price_range.min} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      type="number" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá đến</label>
                    <input 
                      name="price_range.max" 
                      value={formData.price_range.max} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      type="number" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số sao</label>
                  <input 
                    name="star_rating" 
                    value={formData.star_rating} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" 
                    min="0" 
                    max="5" 
                  />
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button 
                  type="button" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-colors duration-200" 
                  onClick={() => { setShowForm(false); setEditProperty(null); }}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? 'Đang lưu...' : 'Lưu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement; 