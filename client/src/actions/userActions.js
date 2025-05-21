// src/actions/userActions.js
// Dummy user actions for initial development
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });
    const { data } = await axios.post('/api/users/login', { email, password });
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    // Optionally save to localStorage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    localStorage.removeItem('userInfo'); // Xóa userInfo nếu login fail
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error.response?.data?.message || 'Sai email hoặc mật khẩu',
    });
  }
};

export const register = (userData) => async (dispatch) => {
  // Dummy action
  dispatch({ type: 'USER_REGISTER_SUCCESS', payload: userData });
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'USER_LOGOUT' });
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: 'PASSWORD_RESET_REQUEST' });
    await axios.post(`/api/users/resetpassword/${token}`, { password });
    dispatch({ type: 'PASSWORD_RESET_SUCCESS' });
  } catch (error) {
    dispatch({
      type: 'PASSWORD_RESET_FAIL',
      payload:
        error.response?.data?.message || 'Có lỗi khi đặt lại mật khẩu',
    });
  }
};
