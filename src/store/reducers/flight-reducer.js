import {
  GET_AIRPORTS,
  GET_AIRPORTS_FAIL,
  GET_AIRPORTS_SUCCESS,
  GET_AIRPORT_INFO,
  GET_AIRPORT_INFO_SUCCESS,
  GET_AIRPORT_INFO_FAIL,
} from '../common';

const initialState = {
  airports: null,
  selectedAirportInfo: {
    airportArrivals: null,
    airportDepartures: null,
  },
  error: null,
  isLoading: false,
};

export const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AIRPORTS: {
      return { ...state, isLoading: true };
    }
    case GET_AIRPORTS_SUCCESS: {
      return { ...state, isLoading: false, airports: action.payload };
    }
    case GET_AIRPORTS_FAIL: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case GET_AIRPORT_INFO: {
      return { ...state, isLoading: true };
    }
    case GET_AIRPORT_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        selectedAirportInfo: action.payload,
      };
    }
    case GET_AIRPORT_INFO_FAIL: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
