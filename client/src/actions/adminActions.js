import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
} from '../constants/adminConstants';
import axios from 'axios';

// Action đăng nhập admin
export const loginAdmin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/admin/login',
      { email, password },
      config
    );

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

    // Kiểm tra secret code
    if (secretCode !== '961210') {
      throw new Error('Mã bí mật không chính xác');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/admin/register',
      { user_name, email, password, phone_number, role: 'admin' },
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
