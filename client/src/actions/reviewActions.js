import axios from 'axios';
import {
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_UPDATE_STATUS_REQUEST,
  REVIEW_UPDATE_STATUS_SUCCESS,
  REVIEW_UPDATE_STATUS_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DELETE_FAIL,
  REVIEW_STATS_REQUEST,
  REVIEW_STATS_SUCCESS,
  REVIEW_STATS_FAIL,
  REVIEW_HOST_RESPONSE_REQUEST,
  REVIEW_HOST_RESPONSE_SUCCESS,
  REVIEW_HOST_RESPONSE_FAIL,
  REVIEW_LIST_RESET
} from '../constants/reviewConstants';

// Get all reviews (admin)
export const listReviews = (params = {}) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const queryString = new URLSearchParams(params).toString();
    const { data } = await axios.get(`/api/reviews/admin?${queryString}`, config);

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get review details
export const getReviewDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_DETAILS_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/reviews/${id}`, config);

    dispatch({
      type: REVIEW_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update review status
export const updateReviewStatus = (id, statusData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_UPDATE_STATUS_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/reviews/${id}/status`, statusData, config);

    dispatch({
      type: REVIEW_UPDATE_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_UPDATE_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete review
export const deleteReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_DELETE_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    await axios.delete(`/api/reviews/${id}`, config);

    dispatch({
      type: REVIEW_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Add host response
export const addHostResponse = (id, comment) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_HOST_RESPONSE_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/reviews/${id}/response`, { comment }, config);

    dispatch({
      type: REVIEW_HOST_RESPONSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_HOST_RESPONSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get review statistics
export const getReviewStats = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_STATS_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/reviews/admin/stats', config);

    dispatch({
      type: REVIEW_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Reset review list
export const resetReviewList = () => (dispatch) => {
  dispatch({ type: REVIEW_LIST_RESET });
};
