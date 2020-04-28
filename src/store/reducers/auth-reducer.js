import { getUserFromLocalStorage } from '../../common/utils';

import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  ACCEPT_ERROR,
} from '../common';

const initialState = {
  ...(() => {
    const userData = getUserFromLocalStorage();
    return {
      username: userData ? userData.username : null,
      isAuthorized: !!userData,
    };
  })(),
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return { ...state, isLoading: true };
    }
    case USER_LOGIN_SUCCESS: {
      const { isAuthorized, username } = action.payload;
      return { ...state, isLoading: false, isAuthorized, username };
    }
    case USER_LOGIN_FAIL: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        isLoading: false,
        isAuthorized: false,
        username: null,
      };
    }
    case ACCEPT_ERROR: {
      return { ...state, error: null };
    }
    default: {
      return state;
    }
  }
};
