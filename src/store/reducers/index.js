import { combineReducers } from 'redux';

import { flightReducer } from './flight-reducer';
import { authReducer } from './auth-reducer';

export default combineReducers({ flightReducer, authReducer });
