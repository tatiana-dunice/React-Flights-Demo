import { createAction } from 'redux-actions';

import {
  GET_AIRPORTS,
  GET_AIRPORTS_FAIL,
  GET_AIRPORTS_SUCCESS,
  GET_AIRPORT_INFO,
  GET_AIRPORT_INFO_SUCCESS,
  GET_AIRPORT_INFO_FAIL
} from '../common';

export const getAirportsAction = createAction(GET_AIRPORTS);
export const getAirportsSuccessAction = createAction(GET_AIRPORTS_SUCCESS);
export const getAirportsFailAction = createAction(GET_AIRPORTS_FAIL);

export const getAirportInfoAction = createAction(GET_AIRPORT_INFO);
export const getAirportInfoSuccessAction = createAction(GET_AIRPORT_INFO_SUCCESS);
export const getAirportInfoFailAction = createAction(GET_AIRPORT_INFO_FAIL);
