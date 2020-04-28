import { createAction } from 'redux-actions';

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  ACCEPT_ERROR,
} from '../common';

export const userLoginAction = createAction(USER_LOGIN);
export const userLoginSuccessAction = createAction(USER_LOGIN_SUCCESS);
export const userLoginFailAction = createAction(USER_LOGIN_FAIL);
export const userLogoutAction = createAction(USER_LOGOUT);
export const acceptErrorAction = createAction(ACCEPT_ERROR);
