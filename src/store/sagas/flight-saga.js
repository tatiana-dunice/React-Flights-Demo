import { takeLatest, call, put } from 'redux-saga/effects';
import moment from 'moment';
import axios from 'axios';

import {
  getAirportsSuccessAction,
  getAirportsFailAction,
  getAirportInfoFailAction,
  getAirportInfoSuccessAction,
} from '../actions';
import { GET_AIRPORT_INFO, GET_AIRPORTS } from '../common';

const getAirportsWorker = function* () {
  const begin = moment().subtract(1, 'day').set('hour', 13).unix();
  const end = moment().subtract(1, 'day').set('hour', 15).unix();
  let all;

  try {
    all = yield call(axios, {
      url: `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`,
    });
    const aggregated = all.data.reduce((acc, flight) => {
      const { estArrivalAirport, estDepartureAirport } = flight;

      if (estArrivalAirport) {
        if (estArrivalAirport in acc) {
          acc[estArrivalAirport].count += 1;
        } else {
          acc[estArrivalAirport] = {
            count: 0,
          };
          acc[estArrivalAirport].count = 0;
        }
      }

      if (estDepartureAirport) {
        if (estDepartureAirport in acc) {
          acc[estDepartureAirport].count += 1;
        } else {
          acc[estDepartureAirport] = {
            count: 0,
          };
          acc[estDepartureAirport].count = 0;
        }
      }

      return acc;
    }, {});

    const sortedAirportsEntries = Object.entries(aggregated).sort(
      ([, { count }], [, { count: countB }]) => countB - count
    );
    const tenAirports = sortedAirportsEntries
      .map(([airport]) => airport)
      .slice(0, 10);

    yield put(getAirportsSuccessAction(tenAirports));
  } catch (e) {
    yield put(getAirportsFailAction(e.message));
  }
};

const getAirportInfoWorker = function* ({ payload }) {
  try {
    const { airportId, begin, end } = payload;
    const { data: airportArrivals } = yield call(axios, {
      url: `https://opensky-network.org/api/flights/arrival?airport=${airportId}&begin=${begin}&end=${end}`,
    });
    const { data: airportDepartures } = yield call(axios, {
      url: `https://opensky-network.org/api/flights/departure?airport=${airportId}&begin=${begin}&end=${end}`,
    });

    yield put(getAirportInfoSuccessAction({ airportArrivals, airportDepartures }));
  } catch (e) {
    yield put(getAirportInfoFailAction(e.message));
  }
};

const flightWatcher = function* () {
  yield takeLatest(GET_AIRPORTS, getAirportsWorker);
  yield takeLatest(GET_AIRPORT_INFO, getAirportInfoWorker);
};

export default flightWatcher;
