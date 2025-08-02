import {
  HOME_GET_FEATURED_PROPERTIES_REQUEST,
  HOME_GET_FEATURED_PROPERTIES_SUCCESS,
  HOME_GET_FEATURED_PROPERTIES_FAIL,
  HOME_GET_POPULAR_LOCATIONS_REQUEST,
  HOME_GET_POPULAR_LOCATIONS_SUCCESS,
  HOME_GET_POPULAR_LOCATIONS_FAIL,
} from '../actions/homeActions';

// Featured properties reducer
export const featuredPropertiesReducer = (state = { properties: [] }, action) => {
  switch (action.type) {
    case HOME_GET_FEATURED_PROPERTIES_REQUEST:
      return { loading: true, properties: [] };
    case HOME_GET_FEATURED_PROPERTIES_SUCCESS:
      return { loading: false, properties: action.payload };
    case HOME_GET_FEATURED_PROPERTIES_FAIL:
      return { loading: false, error: action.payload, properties: [] };
    default:
      return state;
  }
};

// Popular locations reducer
export const popularLocationsReducer = (state = { locations: [] }, action) => {
  switch (action.type) {
    case HOME_GET_POPULAR_LOCATIONS_REQUEST:
      return { loading: true, locations: [] };
    case HOME_GET_POPULAR_LOCATIONS_SUCCESS:
      return { loading: false, locations: action.payload };
    case HOME_GET_POPULAR_LOCATIONS_FAIL:
      return { loading: false, error: action.payload, locations: [] };
    default:
      return state;
  }
};

// Home search reducer
export const homeSearchReducer = (state = { homes: [] }, action) => {
  switch (action.type) {
    case 'HOME_SEARCH_REQUEST':
      return { loading: true, homes: [] };
    case 'HOME_SEARCH_SUCCESS':
      return { loading: false, homes: action.payload.homes, total: action.payload.total };
    case 'HOME_SEARCH_FAIL':
      return { loading: false, error: action.payload, homes: [] };
    case 'HOME_SEARCH_RESET':
      return { homes: [] };
    default:
      return state;
  }
};
