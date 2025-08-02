import axios from 'axios';

// Action types
export const HOME_GET_FEATURED_PROPERTIES_REQUEST = 'HOME_GET_FEATURED_PROPERTIES_REQUEST';
export const HOME_GET_FEATURED_PROPERTIES_SUCCESS = 'HOME_GET_FEATURED_PROPERTIES_SUCCESS';
export const HOME_GET_FEATURED_PROPERTIES_FAIL = 'HOME_GET_FEATURED_PROPERTIES_FAIL';

export const HOME_GET_POPULAR_LOCATIONS_REQUEST = 'HOME_GET_POPULAR_LOCATIONS_REQUEST';
export const HOME_GET_POPULAR_LOCATIONS_SUCCESS = 'HOME_GET_POPULAR_LOCATIONS_SUCCESS';
export const HOME_GET_POPULAR_LOCATIONS_FAIL = 'HOME_GET_POPULAR_LOCATIONS_FAIL';

// Get featured properties for homepage
export const getFeaturedProperties = () => async (dispatch) => {
  try {
    dispatch({ type: HOME_GET_FEATURED_PROPERTIES_REQUEST });

    const { data } = await axios.get('/api/homes/featured');

    dispatch({
      type: HOME_GET_FEATURED_PROPERTIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOME_GET_FEATURED_PROPERTIES_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Get popular locations
export const getPopularLocations = () => async (dispatch) => {
  try {
    dispatch({ type: HOME_GET_POPULAR_LOCATIONS_REQUEST });

    const { data } = await axios.get('/api/locations/popular');

    dispatch({
      type: HOME_GET_POPULAR_LOCATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOME_GET_POPULAR_LOCATIONS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Search homes
export const searchHomes = (searchParams) => async (dispatch) => {
  try {
    dispatch({ type: 'HOME_SEARCH_REQUEST' });

    const queryString = new URLSearchParams(searchParams).toString();
    const { data } = await axios.get(`/api/homes/search?${queryString}`);

    dispatch({
      type: 'HOME_SEARCH_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'HOME_SEARCH_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
