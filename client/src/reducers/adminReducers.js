import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_SUCCESS,
  ADMIN_LIST_FAIL,
  ADMIN_LIST_RESET,
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_DETAILS_REQUEST,
  ADMIN_USER_DETAILS_SUCCESS,
  ADMIN_USER_DETAILS_FAIL,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_UPDATE_RESET,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_DELETE_FAIL,
  ADMIN_USER_CREATE_REQUEST,
  ADMIN_USER_CREATE_SUCCESS,
  ADMIN_USER_CREATE_FAIL,
  ADMIN_USER_CREATE_RESET,
  ADMIN_GET_STATS_REQUEST,
  ADMIN_GET_STATS_SUCCESS,
  ADMIN_GET_STATS_FAIL,
} from '../constants/adminConstants';

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const adminRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { loading: true };
    case ADMIN_REGISTER_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminListReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_REQUEST:
      return { loading: true };
    case ADMIN_LIST_SUCCESS:
      return { loading: false, admins: action.payload };
    case ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LIST_RESET:
      return { admins: [] };
    default:
      return state;
  }
};

export const adminStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case ADMIN_GET_STATS_REQUEST:
      return { loading: true, stats: {} };
    case ADMIN_GET_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case ADMIN_GET_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUserListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USER_LIST_REQUEST:
      return { loading: true };
    case ADMIN_USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case ADMIN_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ADMIN_USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case ADMIN_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUserUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const adminUserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUserCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_CREATE_REQUEST:
      return { loading: true };
    case ADMIN_USER_CREATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case ADMIN_USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
