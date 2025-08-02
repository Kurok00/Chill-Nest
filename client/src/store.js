import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  adminLoginReducer,
  adminRegisterReducer,
  adminListReducer,
  adminStatsReducer,
  adminUserListReducer,
  adminUserDetailsReducer,
  adminUserUpdateReducer,
  adminUserDeleteReducer,
  adminUserCreateReducer
} from './reducers/adminReducers';

import {
  featuredPropertiesReducer,
  popularLocationsReducer,
  homeSearchReducer
} from './reducers/homeReducers';

// User Login Reducer
const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, userInfo: action.payload };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    case 'TOKEN_REFRESH':
      return { 
        ...state, 
        userInfo: { ...state.userInfo, token: action.payload } 
      };
    default:
      return state;
  }
};

// User Register Reducer
const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return { loading: true };
    case 'USER_REGISTER_SUCCESS':
      return { loading: false, success: true, userInfo: action.payload };
    case 'USER_REGISTER_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User Verification Reducer
const userVerificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'EMAIL_VERIFY_REQUEST':
      return { loading: true };
    case 'EMAIL_VERIFY_SUCCESS':
      return { loading: false, success: true };
    case 'EMAIL_VERIFY_FAIL':
      return { loading: false, error: action.payload };
    case 'PHONE_VERIFY_REQUEST':
      return { loading: true };
    case 'PHONE_VERIFY_SUCCESS':
      return { loading: false, success: true };
    case 'PHONE_VERIFY_FAIL':
      return { loading: false, error: action.payload };
    case 'PHONE_CODE_SEND_REQUEST':
      return { ...state, sendingCode: true };
    case 'PHONE_CODE_SEND_SUCCESS':
      return { ...state, sendingCode: false, codeSent: true };
    case 'PHONE_CODE_SEND_FAIL':
      return { ...state, sendingCode: false, codeError: action.payload };
    default:
      return state;
  }
};

// Password Reset Reducer
const passwordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PASSWORD_FORGOT_REQUEST':
      return { loading: true };
    case 'PASSWORD_FORGOT_SUCCESS':
      return { loading: false, success: true };
    case 'PASSWORD_FORGOT_FAIL':
      return { loading: false, error: action.payload };
    case 'PASSWORD_RESET_REQUEST':
      return { loading: true };
    case 'PASSWORD_RESET_SUCCESS':
      return { loading: false, success: true };
    case 'PASSWORD_RESET_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Password Change Reducer
const passwordChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PASSWORD_CHANGE_REQUEST':
      return { loading: true };
    case 'PASSWORD_CHANGE_SUCCESS':
      return { loading: false, success: true };
    case 'PASSWORD_CHANGE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User Profile Reducer
const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case 'USER_PROFILE_REQUEST':
      return { ...state, loading: true };
    case 'USER_PROFILE_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_PROFILE_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_PROFILE_UPDATE_REQUEST':
      return { ...state, loading: true };
    case 'USER_PROFILE_UPDATE_SUCCESS':
      return { loading: false, success: true, user: action.payload };
    case 'USER_PROFILE_UPDATE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Notification reducer
const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        ...action.payload
      };
    case 'CLEAR_NOTIFICATION':
      return {};
    default:
      return state;
  }
};

// Combine all reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerification: userVerificationReducer,
  passwordReset: passwordResetReducer,
  passwordChange: passwordChangeReducer,
  userProfile: userProfileReducer,
  notification: notificationReducer,
  adminLogin: adminLoginReducer,
  adminRegister: adminRegisterReducer,
  adminList: adminListReducer,
  adminStats: adminStatsReducer,  adminUserList: adminUserListReducer,
  adminUserDetails: adminUserDetailsReducer,
  adminUserUpdate: adminUserUpdateReducer,
  adminUserDelete: adminUserDeleteReducer,
  adminUserCreate: adminUserCreateReducer,
  // Home page reducers
  featuredProperties: featuredPropertiesReducer,
  popularLocations: popularLocationsReducer,
  homeSearch: homeSearchReducer,
  // Thêm các reducers khác ở đây
});

// Get user info from localStorage if exists
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Get admin info from localStorage if exists
const adminInfoFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];

// Cấu hình an toàn cho redux-devtools-extension
const composeEnhancers = 
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(
  reducer,
  initialState,
  enhancer
);

export default store;
