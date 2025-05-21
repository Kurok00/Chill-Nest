// src/actions/userActions.js
import axios from 'axios';

// Đăng nhập
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });
    const { data } = await axios.post('/api/users/login', { email, password });
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data; // Return data for successful login
  } catch (error) {
    localStorage.removeItem('userInfo'); // Xóa userInfo nếu login fail
    const errorMessage = error.response?.data?.message || 'Sai email hoặc mật khẩu';
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};

// Đăng ký (gửi OTP)
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_REGISTER_REQUEST' });
    const { data } = await axios.post('/api/users/register', userData);
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};

// Xác thực OTP sau khi đăng ký
export const verifyOtp = (verifyData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_VERIFY_OTP_REQUEST' });
    const { data } = await axios.post('/api/users/verify-otp', verifyData);
    dispatch({ type: 'USER_VERIFY_OTP_SUCCESS', payload: data });
    // Đăng nhập sau khi xác thực thành công
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Xác thực OTP thất bại';
    dispatch({
      type: 'USER_VERIFY_OTP_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};

// Gửi lại OTP
export const resendOtp = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_RESEND_OTP_REQUEST' });
    const { data } = await axios.post('/api/users/resend-otp', { email: userData.email });
    dispatch({ type: 'USER_RESEND_OTP_SUCCESS', payload: data });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Gửi lại OTP thất bại';
    dispatch({
      type: 'USER_RESEND_OTP_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};

// Đăng xuất
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  // Reset store state
  dispatch({ type: 'USER_LOGOUT' });
  dispatch({ type: 'USER_PROFILE_RESET' });
};

// Lấy thông tin người dùng
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_PROFILE_REQUEST' });
    
    const { userLogin: { userInfo } } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.get('/api/users/profile', config);
    
    dispatch({ type: 'USER_PROFILE_SUCCESS', payload: data });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Không thể lấy thông tin người dùng';
    dispatch({
      type: 'USER_PROFILE_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_UPDATE_PROFILE_REQUEST' });
    
    const { userLogin: { userInfo } } = getState();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.put('/api/users/profile', userData, config);
    
    dispatch({ type: 'USER_UPDATE_PROFILE_SUCCESS', payload: data });
    
    // Cập nhật userInfo trong localStorage và state
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Cập nhật thông tin thất bại';
    dispatch({
      type: 'USER_UPDATE_PROFILE_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};

// Quên mật khẩu
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });
    const { data } = await axios.post('/api/users/forgotpassword', { email });
    dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: data });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Gửi yêu cầu đặt lại mật khẩu thất bại';
    dispatch({
      type: 'FORGOT_PASSWORD_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};

// Đặt lại mật khẩu
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: 'PASSWORD_RESET_REQUEST' });
    const { data } = await axios.post(`/api/users/resetpassword/${token}`, { password });
    dispatch({ type: 'PASSWORD_RESET_SUCCESS', payload: data });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Đặt lại mật khẩu thất bại';
    dispatch({
      type: 'PASSWORD_RESET_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};

// Đổi mật khẩu (khi đã đăng nhập)
export const changePassword = (currentPassword, newPassword) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'CHANGE_PASSWORD_REQUEST' });
    
    const { userLogin: { userInfo } } = getState();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.put('/api/users/changepassword', { 
      currentPassword, 
      newPassword 
    }, config);
    
    dispatch({ type: 'CHANGE_PASSWORD_SUCCESS', payload: data });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Thay đổi mật khẩu thất bại';
    dispatch({
      type: 'CHANGE_PASSWORD_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};

// Kiểm tra thông tin đăng ký có bị trùng lặp không
export const checkUniqueUserInfo = (infoToCheck) => async (dispatch) => {
  try {
    dispatch({ type: 'CHECK_UNIQUE_INFO_REQUEST' });
    const { data } = await axios.post('/api/users/check-unique', infoToCheck);
    dispatch({ type: 'CHECK_UNIQUE_INFO_SUCCESS', payload: data });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Kiểm tra thông tin thất bại';
    dispatch({
      type: 'CHECK_UNIQUE_INFO_FAIL',
      payload: errorMessage,
    });
    throw error;
  }
};
