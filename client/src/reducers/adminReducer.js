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