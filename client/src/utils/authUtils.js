// Auth utilities for handling token expiration and refresh

/**
 * Check if the stored user token is valid or expired
 * Returns true if the token is valid, false if expired
 */
export const checkTokenValidity = () => {
  const userInfoStr = localStorage.getItem('userInfo');
  if (!userInfoStr) {
    return false;
  }
  
  const userInfo = JSON.parse(userInfoStr);
  const expiresAt = userInfo.expiresAt;
  
  if (!expiresAt) {
    return false;
  }
  
  // Check if token is expired
  return new Date().getTime() < expiresAt;
};

/**
 * Setup a periodic check for token expiration
 * If token is about to expire (within 1 hour), refresh it
 */
export const setupTokenRefresh = (store) => {
  // Check token every 15 minutes
  setInterval(() => {
    const userInfoStr = localStorage.getItem('userInfo');
    if (!userInfoStr) {
      return;
    }
    
    const userInfo = JSON.parse(userInfoStr);
    const expiresAt = userInfo.expiresAt;
    
    if (!expiresAt) {
      return;
    }
    
    const oneHourInMs = 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    
    // If token will expire within the next hour, refresh it
    if (expiresAt - currentTime < oneHourInMs) {
      // Call a refresh token API or update expiration time
      const newExpirationTime = currentTime + (7 * 24 * 60 * 60 * 1000); // 7 more days
      
      const updatedUserInfo = {
        ...userInfo,
        expiresAt: newExpirationTime,
      };
      
      // Update localStorage
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      
      // Update Redux store if needed
      if (store) {
        store.dispatch({
          type: 'TOKEN_REFRESH',
          payload: userInfo.token,
        });
      }
    }
    
    // If token is already expired, log out
    if (currentTime > expiresAt) {
      localStorage.removeItem('userInfo');
      if (store) {
        store.dispatch({ type: 'USER_LOGOUT' });
      }
    }
  }, 15 * 60 * 1000); // Check every 15 minutes
};

/**
 * Clear user session from localStorage and memory
 */
export const clearUserSession = () => {
  localStorage.removeItem('userInfo');
};

/**
 * Initialize auth state by checking for existing valid session
 */
export const initializeAuthState = (store) => {
  if (checkTokenValidity()) {
    // Token is valid, set up refresh cycle
    setupTokenRefresh(store);
  } else {
    // Token is invalid or expired, clear it
    clearUserSession();
    store.dispatch({ type: 'USER_LOGOUT' });
  }
};
