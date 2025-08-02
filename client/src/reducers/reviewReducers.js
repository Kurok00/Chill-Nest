import {
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_RESET,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_DETAILS_RESET,
  REVIEW_UPDATE_STATUS_REQUEST,
  REVIEW_UPDATE_STATUS_SUCCESS,
  REVIEW_UPDATE_STATUS_FAIL,
  REVIEW_UPDATE_STATUS_RESET,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_RESET,
  REVIEW_STATS_REQUEST,
  REVIEW_STATS_SUCCESS,
  REVIEW_STATS_FAIL,
  REVIEW_HOST_RESPONSE_REQUEST,
  REVIEW_HOST_RESPONSE_SUCCESS,
  REVIEW_HOST_RESPONSE_FAIL,
  REVIEW_HOST_RESPONSE_RESET
} from '../constants/reviewConstants';

// Review list reducer
export const reviewListReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return { loading: true, reviews: [] };
    case REVIEW_LIST_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        totalReviews: action.payload.totalReviews,
        hasMore: action.payload.hasMore
      };
    case REVIEW_LIST_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_LIST_RESET:
      return { reviews: [] };
    default:
      return state;
  }
};

// Review details reducer
export const reviewDetailsReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case REVIEW_DETAILS_REQUEST:
      return { ...state, loading: true };
    case REVIEW_DETAILS_SUCCESS:
      return { loading: false, review: action.payload };
    case REVIEW_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_DETAILS_RESET:
      return { review: {} };
    default:
      return state;
  }
};

// Review update status reducer
export const reviewUpdateStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_UPDATE_STATUS_REQUEST:
      return { loading: true };
    case REVIEW_UPDATE_STATUS_SUCCESS:
      return { loading: false, success: true, review: action.payload.review };
    case REVIEW_UPDATE_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_UPDATE_STATUS_RESET:
      return {};
    default:
      return state;
  }
};

// Review delete reducer
export const reviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return { loading: true };
    case REVIEW_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REVIEW_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// Review statistics reducer
export const reviewStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case REVIEW_STATS_REQUEST:
      return { loading: true, stats: {} };
    case REVIEW_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case REVIEW_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Review host response reducer
export const reviewHostResponseReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_HOST_RESPONSE_REQUEST:
      return { loading: true };
    case REVIEW_HOST_RESPONSE_SUCCESS:
      return { loading: false, success: true, review: action.payload.review };
    case REVIEW_HOST_RESPONSE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_HOST_RESPONSE_RESET:
      return {};
    default:
      return state;
  }
};
