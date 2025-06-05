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
