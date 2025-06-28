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
    // Vietnamese phone number format
    const re = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    return phone === '' || re.test(phone); // Optional but if provided must be valid
  };

  const validatePassword = (password) => {
    // At least 6 characters with at least one uppercase letter, one lowercase letter, and one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return re.test(password);
  };

  const validateCreateForm = () => {
    const errors = {};
    
    if (!newUserName || newUserName.length < 3) {
      errors.userName = 'Tên người dùng phải có ít nhất 3 ký tự';
    }
    
    if (!newEmail || !validateEmail(newEmail)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!newPassword || !validatePassword(newPassword)) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số';
    }
    
    if (newPhone && !validatePhone(newPhone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
    
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
    
    if (phone && !validatePhone(phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
    
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
  };  const handleUpdate = (e) => {
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
        password: newPassword,
        phone_number: newPhone,
        role: newRole
      };
      dispatch(createUser(newUser));
    }
  };
  
  const resetCreateForm = () => {
    setNewUserName('');
    setNewEmail('');
    setNewPhone('');
    setNewPassword('');
    setNewRole('user');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-100">Quản lý Người dùng</h2>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>          <button 
            onClick={() => setShowCreateModal(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredUsers && filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={user.profile_image || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} alt={user.user_name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.user_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{user.phone_number || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${user.role === 'admin' ? 'bg-purple-900 text-purple-100' :
                          user.role === 'host' ? 'bg-green-900 text-green-100' :
                            user.role === 'kol' ? 'bg-blue-900 text-blue-100' :
                              'bg-gray-900 text-gray-100'}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_verified ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
                        {user.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(user.created_at || user.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
        </div>
      )}

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
                  Số điện thoại
                </label>
                <input
                  className={`shadow appearance-none border ${editFormErrors.phone ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
            <form onSubmit={handleCreateUser}>              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="newUserName">
                  Tên người dùng
                </label>
                <input
                  className={`shadow appearance-none border ${formErrors.userName ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="newUserName"
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
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
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
                {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="newPassword">
                  Mật khẩu
                </label>
                <input
                  className={`shadow appearance-none border ${formErrors.password ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {formErrors.password && <p className="text-red-500 text-xs italic">{formErrors.password}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="newPhone">
                  Số điện thoại
                </label>
                <input
                  className={`shadow appearance-none border ${formErrors.phone ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  id="newPhone"
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
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
    </div>
  );
};

export default UserManagement;
