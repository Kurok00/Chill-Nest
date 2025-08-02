import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api/admin/rooms';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [formData, setFormData] = useState({
    home_id: '',
    room_name: '',
    description: '',
    room_type: 'single',
    regular_price: '',
    max_guests: { adults: 2, children: 0 },
    amenities: [],
  });

  // Fetch rooms
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(API_URL, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setRooms(res.data);
      setError('');
    } catch (err) {
      setError('Lỗi tải danh sách phòng');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('max_guests.')) {
      const field = name.split('.')[1];
      setFormData({ ...formData, max_guests: { ...formData.max_guests, [field]: value } });
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
      
      if (editRoom) {
        await axios.put(`${API_URL}/${editRoom._id}`, formData, { headers });
      } else {
        await axios.post(API_URL, formData, { headers });
      }
      setShowForm(false);
      setEditRoom(null);
      setFormData({
        home_id: '', room_name: '', description: '', room_type: 'single', regular_price: '', max_guests: { adults: 2, children: 0 }, amenities: [],
      });
      fetchRooms();
    } catch (err) {
      setError('Lỗi lưu thông tin phòng');
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = (room) => {
    setEditRoom(room);
    setFormData({ ...room });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa phòng này?')) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchRooms();
    } catch (err) {
      setError('Lỗi xóa phòng');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Quản lý phòng</h2>
        <div className="mt-4 flex justify-end">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200" 
            onClick={() => { setShowForm(true); setEditRoom(null); }}
          >
            <FaPlus className="mr-2" /> Thêm phòng
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
          <h3 className="text-lg font-semibold text-white">Danh sách phòng</h3>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tên phòng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Khách sạn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Loại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Giá</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Khách tối đa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {rooms.map((r) => (
                  <tr key={r._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{r.room_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {typeof r.home_id === 'object' ? r.home_id?.name || r.home_id?._id : r.home_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{r.room_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {r.regular_price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(r.regular_price) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {r.max_guests?.adults || 0} người lớn, {r.max_guests?.children || 0} trẻ em
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-blue-400 hover:text-blue-300 mr-3 transition-colors duration-200" 
                        onClick={() => handleEdit(r)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300 transition-colors duration-200" 
                        onClick={() => handleDelete(r._id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white p-6 rounded shadow-md w-full max-w-lg" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-4">{editRoom ? 'Sửa phòng' : 'Thêm phòng'}</h3>
            <div className="mb-2">
              <label className="block mb-1">ID Khách sạn</label>
              <input name="home_id" value={formData.home_id} onChange={handleChange} className="border p-2 w-full" required />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Tên phòng</label>
              <input name="room_name" value={formData.room_name} onChange={handleChange} className="border p-2 w-full" required />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Mô tả</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" required />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Loại phòng</label>
              <select name="room_type" value={formData.room_type} onChange={handleChange} className="border p-2 w-full">
                <option value="single">Đơn</option>
                <option value="double">Đôi</option>
                <option value="twin">Twin</option>
                <option value="family">Gia đình</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
                <option value="superior">Superior</option>
                <option value="standard">Standard</option>
                <option value="dorm">Dorm</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Giá thường</label>
              <input name="regular_price" value={formData.regular_price} onChange={handleChange} className="border p-2 w-full" type="number" required />
            </div>
            <div className="mb-2 flex gap-2">
              <div className="flex-1">
                <label className="block mb-1">Người lớn tối đa</label>
                <input name="max_guests.adults" value={formData.max_guests.adults} onChange={handleChange} className="border p-2 w-full" type="number" />
              </div>
              <div className="flex-1">
                <label className="block mb-1">Trẻ em tối đa</label>
                <input name="max_guests.children" value={formData.max_guests.children} onChange={handleChange} className="border p-2 w-full" type="number" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => { setShowForm(false); setEditRoom(null); }}>Hủy</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RoomManagement; 