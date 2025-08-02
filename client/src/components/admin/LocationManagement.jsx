import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api/admin/locations';

const LocationManagement = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editLocation, setEditLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'city',
    parent_id: '',
    coordinates: { latitude: '', longitude: '' },
    is_popular: false,
    description: '',
  });

  // Fetch locations
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(API_URL, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setLocations(res.data);
      setError('');
    } catch (err) {
      setError('Lỗi tải danh sách địa điểm');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('coordinates.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        coordinates: { ...formData.coordinates, [field]: value }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Handle add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };
      
      if (editLocation) {
        await axios.put(`${API_URL}/${editLocation._id}`, formData, { headers });
      } else {
        await axios.post(API_URL, formData, { headers });
      }
      setShowForm(false);
      setEditLocation(null);
      setFormData({
        name: '',
        type: 'city',
        parent_id: '',
        coordinates: { latitude: '', longitude: '' },
        is_popular: false,
        description: '',
      });
      fetchLocations();
    } catch (err) {
      setError('Lỗi lưu thông tin địa điểm');
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = (location) => {
    setEditLocation(location);
    setFormData({ ...location });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa địa điểm này?')) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchLocations();
    } catch (err) {
      setError('Lỗi xóa địa điểm');
    }
    setLoading(false);
  };

  // Loading state
  if (loading && locations.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Quản lý địa điểm</h2>
        <div className="mt-4 flex justify-end">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200" 
            onClick={() => { setShowForm(true); setEditLocation(null); }}
          >
            <FaPlus className="mr-2" /> Thêm địa điểm
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
          <h3 className="text-lg font-semibold text-white">Danh sách địa điểm</h3>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Mô tả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tọa độ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phổ biến</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {locations.map((l) => (
                  <tr key={l._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{l.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{l.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {l.description ? (l.description.length > 50 ? l.description.substring(0, 50) + '...' : l.description) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {l.coordinates?.latitude && l.coordinates?.longitude 
                        ? `${l.coordinates.latitude}, ${l.coordinates.longitude}` 
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        l.is_popular 
                          ? 'bg-yellow-900 text-yellow-300' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {l.is_popular ? 'Phổ biến' : 'Thường'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-blue-400 hover:text-blue-300 mr-3 transition-colors duration-200" 
                        onClick={() => handleEdit(l)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300 transition-colors duration-200" 
                        onClick={() => handleDelete(l._id)}
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
                  {editLocation ? 'Sửa địa điểm' : 'Thêm địa điểm'}
                </h3>
              </div>
              
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên địa điểm</label>
                  <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại địa điểm</label>
                  <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="country">Quốc gia</option>
                    <option value="province">Tỉnh/Thành phố</option>
                    <option value="city">Thành phố</option>
                    <option value="district">Quận/Huyện</option>
                    <option value="ward">Phường/Xã</option>
                    <option value="landmark">Địa danh</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vĩ độ (Latitude)</label>
                    <input 
                      name="coordinates.latitude" 
                      value={formData.coordinates?.latitude || ''} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      type="number"
                      step="any"
                      placeholder="Ví dụ: 10.762622"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kinh độ (Longitude)</label>
                    <input 
                      name="coordinates.longitude" 
                      value={formData.coordinates?.longitude || ''} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      type="number"
                      step="any"
                      placeholder="Ví dụ: 106.660172"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox"
                      name="is_popular" 
                      checked={formData.is_popular} 
                      onChange={handleChange} 
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Địa điểm phổ biến</span>
                  </label>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button 
                  type="button" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-colors duration-200" 
                  onClick={() => { setShowForm(false); setEditLocation(null); }}
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

export default LocationManagement;
