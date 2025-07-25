import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser, updateUser, createUser } from '../../actions/adminActions';
import { ADMIN_USER_CREATE_RESET } from '../../constants/adminConstants';
import { FaEdit, FaTrash, FaUserPlus, FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.adminUserList);
  const { success: deleteSuccess } = useSelector((state) => state.adminUserDelete);
  const { loading: createLoading, error: createError, success: createSuccess } = useSelector((state) => state.adminUserCreate);
  const { success: updateSuccess } = useSelector((state) => state.adminUserUpdate || {});
  
  // Notification states
  const [notification, setNotification] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Form states for editing
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  
  // Form states for creating new user
  const [newUserName, setNewUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('user');
  
  // Show/hide password state
  const [showPassword, setShowPassword] = useState(false);
  
  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});

  useEffect(() => {
    dispatch(listUsers());
    
    if (createSuccess) {
      setShowCreateModal(false);
      resetCreateForm();
      dispatch({ type: ADMIN_USER_CREATE_RESET });
      setNotification({ type: 'success', message: 'Người dùng đã được tạo thành công!' });
    }

    if (updateSuccess) {
      setShowEditModal(false);
      setNotification({ type: 'success', message: 'Người dùng đã được cập nhật thành công!' });
    }

    if (deleteSuccess) {
      setNotification({ type: 'success', message: 'Người dùng đã được xóa thành công!' });
    }
  }, [dispatch, deleteSuccess, createSuccess, updateSuccess]);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    // Accept any phone format - no restrictions
    return true;
  };

  const validatePassword = (password) => {
    // Accept any password format - no restrictions
    return true;
  };

  const validateCreateForm = () => {
    const errors = {};
    
    if (!newUserName || newUserName.length < 3) {
      errors.userName = 'Tên người dùng phải có ít nhất 3 ký tự';
    }
    
    if (!newEmail || !validateEmail(newEmail)) {
      errors.email = 'Email không hợp lệ';
    }
    
    // Password and phone are completely optional with no restrictions
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEditForm = () => {
    const errors = {};
    
    if (!userName || userName.length < 3) {
      errors.userName = 'Tên người dùng phải có ít nhất 3 ký tự';
    }
    
    if (!email || !validateEmail(email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    // Phone number has no restrictions
    
    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users?.filter(user => 
    user.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserName(user.user_name);
    setEmail(user.email);
    setPhone(user.phone_number || '');
    setRole(user.role);
    setIsVerified(user.is_verified);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setConfirmDelete(id);
  };

  const confirmDeleteUser = () => {
    dispatch(deleteUser(confirmDelete));
    setConfirmDelete(null);
  };
  
  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateEditForm()) {
      const updatedUser = {
        _id: editingUser._id,
        user_name: userName,
        email: email,
        phone_number: phone,
        role: role,
        is_verified: isVerified
      };
      dispatch(updateUser(updatedUser));
      setShowEditModal(false);
    }
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (validateCreateForm()) {
      const newUser = {
        user_name: newUserName,
        email: newEmail,
        phone_number: newPhone,
        role: newRole
      };
      
      // Only include password if it's provided
      if (newPassword) {
        newUser.password = newPassword;
      }
      
      dispatch(createUser(newUser));
    }
  };
  
  const resetCreateForm = () => {
    setNewUserName('');
    setNewEmail('');
    setNewPhone('');
    setNewPassword('');
    setNewRole('user');
    setShowPassword(false);
    setFormErrors({});
  };

  return (
    <React.Fragment>
      <div className="p-2 sm:p-4 md:p-6 flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4 md:gap-0">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">Quản lý Người dùng</h2>
            <div className="flex items-center w-full md:w-auto">
              <div className="relative mr-4 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Tìm kiếm người dùng..."
                  className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 w-full md:w-64"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button 
                onClick={() => {
                  // Reset form trước khi mở modal
                  setNewUserName('');
                  setNewEmail('');
                  setNewPhone('');
                  setNewPassword('');
                  setNewRole('user');
                  setShowPassword(false);
                  setFormErrors({});
                  // Delay một chút để đảm bảo state được clear
                  setTimeout(() => {
                    setShowCreateModal(true);
                  }, 50);
                }} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center w-full md:w-auto justify-center md:justify-start mt-2 md:mt-0"
              >
                <FaUserPlus className="mr-2" /> Thêm người dùng
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Lỗi!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Responsive: Hiển thị bảng trên md trở lên, card trên mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700 text-base md:text-lg lg:text-xl">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Số điện thoại
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Vai trò
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredUsers && filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 lg:h-16 lg:w-16">
                            <img className="h-12 w-12 lg:h-16 lg:w-16 rounded-full object-cover" src={user.profile_image || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} alt={user.user_name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-base md:text-lg font-medium text-white">{user.user_name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base md:text-lg text-gray-300">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base md:text-lg text-gray-300">{user.phone_number || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs md:text-sm leading-5 font-semibold rounded-full
                          ${user.role === 'admin' ? 'bg-purple-900 text-purple-100' :
                            user.role === 'host' ? 'bg-green-900 text-green-100' :
                              user.role === 'kol' ? 'bg-blue-900 text-blue-100' :
                                'bg-gray-900 text-gray-100'}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs md:text-sm leading-5 font-semibold rounded-full ${user.is_verified ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}> 
                          {user.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base md:text-lg text-gray-300">
                        {new Date(user.created_at || user.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-base md:text-lg font-medium">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-400 hover:text-blue-300 mr-4">
                          <FaEdit className="inline" /> Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-400 hover:text-red-300">
                          <FaTrash className="inline" /> Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Card view cho mobile */}
            <div className="block md:hidden">
              <div className="grid grid-cols-1 gap-4">
                {filteredUsers && filteredUsers.map((user) => (
                  <div key={user._id} className="bg-gray-700 rounded-lg p-4 flex flex-col shadow">
                    <div className="flex items-center mb-2">
                      <img className="h-12 w-12 rounded-full object-cover mr-3" src={user.profile_image || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} alt={user.user_name} />
                      <div>
                        <div className="text-base font-semibold text-white">{user.user_name}</div>
                        <div className="text-xs text-gray-300">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${user.role === 'admin' ? 'bg-purple-900 text-purple-100' :
                          user.role === 'host' ? 'bg-green-900 text-green-100' :
                            user.role === 'kol' ? 'bg-blue-900 text-blue-100' :
                              'bg-gray-900 text-gray-100'}`}>
                        {user.role.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.is_verified ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}> 
                        {user.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">SĐT: {user.phone_number || 'N/A'}</div>
                    <div className="text-xs text-gray-400 mb-2">Ngày tạo: {new Date(user.created_at || user.createdAt).toLocaleDateString('vi-VN')}</div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded flex items-center justify-center">
                        <FaEdit className="inline mr-1" /> Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded flex items-center justify-center">
                        <FaTrash className="inline mr-1" /> Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-96 max-w-md">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Chỉnh sửa Người dùng</h3>
            <form onSubmit={handleUpdate}>              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="userName">
                  Tên người dùng
                </label>
                <input
                  className={`shadow appearance-none border ${editFormErrors.userName ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                {editFormErrors.userName && <p className="text-red-500 text-xs italic">{editFormErrors.userName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className={`shadow appearance-none border ${editFormErrors.email ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {editFormErrors.email && <p className="text-red-500 text-xs italic">{editFormErrors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="phone">
                  Số điện thoại (Tùy chọn)
                </label>
                <input
                  className={`shadow appearance-none border ${editFormErrors.phone ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Để trống nếu không có số điện thoại"
                />
                {editFormErrors.phone && <p className="text-red-500 text-xs italic">{editFormErrors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="role">
                  Vai trò
                </label>
                <select
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="host">Host</option>
                  <option value="kol">KOL</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2 text-gray-300">Đã xác thực</span>
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => setShowEditModal(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Xác nhận xóa</h3>
            <p className="text-gray-300 mb-6">Bạn có chắc chắn muốn xóa người dùng này không? Hành động này không thể hoàn tác.</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={() => setConfirmDelete(null)}
              >
                Hủy
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={confirmDeleteUser}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-96 max-w-md">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Thêm Người dùng mới</h3>
            {createError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Lỗi!</strong>
                <span className="block sm:inline"> {createError}</span>
              </div>
            )}
            <form onSubmit={handleCreateUser} autoComplete="off">
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="newUserName">
                  Tên người dùng
                </label>
                <input
                  className={`shadow appearance-none border ${formErrors.userName ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="newUserName"
                  name="new-username"
                  type="text"
                  value={newUserName || ''}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Nhập tên người dùng"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
                {formErrors.userName && <p className="text-red-500 text-xs italic">{formErrors.userName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="newEmail">
                  Email
                </label>
                <input
                  className={`shadow appearance-none border ${formErrors.email ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="newEmail"
                  name="new-email"
                  type="email"
                  value={newEmail || ''}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Nhập email"
                  autoComplete="off"
                  required
                />
                {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="newPassword">
                  Mật khẩu (Tùy chọn)
                </label>
                <div className="relative">
                  <input
                    className={`shadow appearance-none border ${formErrors.password ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 pr-10 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                    id="newPassword"
                    name="new-password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword || ''}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Để trống nếu không muốn đặt mật khẩu"
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {formErrors.password && <p className="text-red-500 text-xs italic">{formErrors.password}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="newPhone">
                  Số điện thoại (Tùy chọn)
                </label>
                <input
                  className={`shadow appearance-none border ${formErrors.phone ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="newPhone"
                  name="new-phone"
                  type="text"
                  value={newPhone || ''}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="Để trống nếu không có số điện thoại"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                {formErrors.phone && <p className="text-red-500 text-xs italic">{formErrors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="newRole">
                  Vai trò
                </label>
                <select
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  id="newRole"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="host">Host</option>
                  <option value="kol">KOL</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => setShowCreateModal(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={createLoading}
                >
                  {createLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang tạo...
                    </span>
                  ) : 'Tạo người dùng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 max-w-xs w-full bg-gray-800 text-white rounded-lg shadow-lg p-4 flex items-center ${notification.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`} role="alert">
          {notification.type === 'success' ? <FaCheckCircle className="h-6 w-6 mr-2" /> : <FaTimesCircle className="h-6 w-6 mr-2" />}
          <span className="text-sm">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-auto text-gray-400 hover:text-gray-300"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserManagement;
