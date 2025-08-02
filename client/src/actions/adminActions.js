import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_GET_STATS_REQUEST,
  ADMIN_GET_STATS_SUCCESS,
  ADMIN_GET_STATS_FAIL,
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_DETAILS_REQUEST,
  ADMIN_USER_DETAILS_SUCCESS,
  ADMIN_USER_DETAILS_FAIL,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_CREATE_REQUEST,
  ADMIN_USER_CREATE_SUCCESS,
  ADMIN_USER_CREATE_FAIL,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_DELETE_FAIL,
} from '../constants/adminConstants';
import axios from 'axios';

// Action đăng nhập admin
export const loginAdmin = (username, password) => async (dispatch) => {
  try {
    console.log('Frontend - Login attempt:', { username, password });
    
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const requestBody = { user_name: username, password };
    console.log('Frontend - Request body:', requestBody);    const { data } = await axios.post(
      '/api/users/admin/login',
      requestBody,
      config
    );

    console.log('Frontend - Login response:', data);

    // Kiểm tra vai trò người dùng
    if (data.role !== 'admin') {
      throw new Error('Không có quyền truy cập trang quản trị');
    }

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('adminInfo', JSON.stringify(data));
    localStorage.setItem('adminToken', data.token); // Thêm dòng này để lưu token riêng
  } catch (error) {
    console.error('Frontend - Login error:', error.response?.data || error.message);
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action đăng ký admin
export const registerAdmin = (user_name, email, password, phone_number, secretCode) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };    const { data } = await axios.post(
      '/api/users/admin/register',
      { user_name, email, password, phone_number, secretCode, role: 'admin' },
      config
    );

    dispatch({
      type: ADMIN_REGISTER_SUCCESS,
      payload: data,
    });

    // Đăng nhập sau khi đăng ký thành công
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('adminInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action đăng xuất admin
export const logoutAdmin = () => (dispatch) => {
  localStorage.removeItem('adminInfo');
  dispatch({ type: ADMIN_LOGOUT });
};

export const getAdminStats = (timeRange) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_GET_STATS_REQUEST });
    
    const { adminLogin: { adminInfo } } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`
      }
    };

    // Giả lập dữ liệu thống kê do chưa có API thật
    // Trong project thực tế, sẽ thay bằng gọi API: await axios.get(`/api/admin/stats?timeRange=${timeRange}`, config);
    const data = {
      totalUsers: 245,
      totalBookings: 182,
      totalRevenue: 42680000, 
      totalProperties: 87,
      recentUsers: [
        { id: 1, user_name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', created_at: '2025-05-30T14:10:30Z' },
        { id: 2, user_name: 'Trần Thị B', email: 'tranthib@example.com', created_at: '2025-05-29T09:22:15Z' },
        { id: 3, user_name: 'Lê Văn C', email: 'levanc@example.com', created_at: '2025-05-28T18:45:00Z' },
      ],
      recentBookings: [
        { id: 101, user_name: 'Hoàng Văn E', property_name: 'Sunset Villa', amount: 2850000, status: 'confirmed', date: '2025-05-31T10:15:00Z' },
      ]
    };

    dispatch({
      type: ADMIN_GET_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_STATS_FAIL,
      payload: error.response?.data?.message || 'Có lỗi xảy ra khi lấy thống kê',
    });
  }
};

// Lấy danh sách tất cả người dùng
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_LIST_REQUEST });

    const { adminLogin: { adminInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`
      }
    };    const { data } = await axios.get('/api/users', config);

    dispatch({
      type: ADMIN_USER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_LIST_FAIL,
      payload: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách người dùng'
    });
  }
};

// Lấy thông tin chi tiết của một người dùng
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_DETAILS_REQUEST });

    const { adminLogin: { adminInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`
      }
    };    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: ADMIN_USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DETAILS_FAIL,
      payload: error.response?.data?.message || 'Có lỗi xảy ra khi lấy thông tin người dùng'
    });
  }
};

// Cập nhật thông tin người dùng
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_UPDATE_REQUEST });

    const { adminLogin: { adminInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`
      }
    };    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: ADMIN_USER_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_UPDATE_FAIL,
      payload: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin người dùng'
    });
  }
};

// Xóa người dùng
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_DELETE_REQUEST });

    const { adminLogin: { adminInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`
      }
    };

    // Kiểm tra lỗi trong console để debug
    console.log(`Deleting user with ID: ${id}`);
    console.log(`Token being used: ${adminInfo.token}`);
    
    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: ADMIN_USER_DELETE_SUCCESS });
  } catch (error) {
    console.error('Error deleting user:', error.response || error);
    dispatch({
      type: ADMIN_USER_DELETE_FAIL,
      payload: error.response?.data?.message || 'Có lỗi xảy ra khi xóa người dùng'
    });
  }
};

// Tạo người dùng mới
export const createUser = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_CREATE_REQUEST });

    const { adminLogin: { adminInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`
      }
    };
    
    const { data } = await axios.post('/api/users', userData, config);

    dispatch({
      type: ADMIN_USER_CREATE_SUCCESS,
      payload: data
    });
    
    // Refresh the user list after creating a new user
    dispatch(listUsers());
    
  } catch (error) {
    dispatch({
      type: ADMIN_USER_CREATE_FAIL,
      payload: error.response?.data?.message || 'Có lỗi xảy ra khi tạo người dùng'
    });
  }
};
