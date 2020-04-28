import { takeLatest, put } from 'redux-saga/effects';

import { USER_LOGIN, USER_LOGOUT } from '../common';

import usersData from './users.json';
import { userLoginSuccessAction, userLoginFailAction } from '../actions';
import {
  putUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../common/utils';

const loginWorker = function* (action) {
  try {
    const { payload } = action;
    const users = usersData.users;
    const user = Object.keys(users).reduce(
      (accum, key) => {
        if (
          users[key].username === payload.username &&
          users[key].password === payload.password
        ) {
          accum.username = users[key].username;
          accum.isAuthorized = true;
        }
        return accum;
      },
      { isAuthorized: false }
    );
    if (!user.isAuthorized) {
      throw new Error('User not found!');
    }
    yield putUserToLocalStorage(user);
    yield put(userLoginSuccessAction(user));
  } catch (e) {
    yield put(userLoginFailAction(e.message));
  }
};

const logoutWorker = function* () {
  yield removeUserFromLocalStorage();
};

const authWatcher = function* () {
  yield takeLatest(USER_LOGIN, loginWorker);
  yield takeLatest(USER_LOGOUT, logoutWorker);
};

export default authWatcher;
