import { all, call } from 'redux-saga/effects';

import flightWatcher from './flight-saga';
import authWatcher from './auth-saga';

const rootSaga = function* () {
  yield all([call(flightWatcher), call(authWatcher)]);
};

export default rootSaga;
