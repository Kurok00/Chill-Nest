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
    console.log('Frontend - Request body:', requestBody);

    const { data } = await axios.post(
      'http://localhost:5000/api/users/admin/login',
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
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/users/admin/register',
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

export const getAdminStats = (timeRange) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_STATS_REQUEST });

    const { data } = await axios.get(`/api/admin/stats?timeRange=${timeRange}`);

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
