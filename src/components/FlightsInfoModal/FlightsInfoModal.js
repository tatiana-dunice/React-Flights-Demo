import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import ArrivingFlightsInfo from './ArrivingFlightsInfo';
import DepartingFlightsInfo from './DepartingFlightsInfo';
import { getAirportInfoAction } from '../../store/actions';

import styles from './FlightsInfoModal.module.css';

const useStyles = makeStyles({
  formControl: {
    margin: 10,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 20,
  },
});

const FlightInfoModal = ({ open, handleClose, airportId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const arrivals = useSelector(
    (state) => state.flightReducer.selectedAirportInfo.airportArrivals || []
  );
  const departing = useSelector(
    (state) => state.flightReducer.selectedAirportInfo.airportDepartures || []
  );

  const isLoading = useSelector((state) => state.flightReducer.isLoading);
  const [minutes, setMinutes] = useState(30);

  const handleChange = ({ target: { value } }) => setMinutes(value);

  useEffect(() => {
    const begin = moment().add(-1, "day").valueOf();
    const end = moment(begin).add(minutes, 'minutes').valueOf();

    dispatch(
      getAirportInfoAction({
        airportId,
        begin: Math.floor(begin / 1000),
        end: Math.floor(end / 1000),
      })
    );
  }, [minutes, dispatch, airportId]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <DialogTitle id="dialog-title">{`${airportId} Info`}</DialogTitle>
      <DialogActions>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Choose timings</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={minutes}
            onChange={handleChange}
          >
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={60}>60 minutes</MenuItem>
            <MenuItem value={120}>120 minutes</MenuItem>
          </Select>
        </FormControl>
      </DialogActions>
      <DialogContent>
        <Typography>Arrival Info</Typography>
        {!isLoading ? (
          <ArrivingFlightsInfo data={arrivals} />
        ) : (
          <CircularProgress size={20} />
        )}
        <Typography>Departing Info</Typography>
        {!isLoading ? (
          <DepartingFlightsInfo data={departing} />
        ) : (
          <CircularProgress size={20} />
        )}
      </DialogContent>
    </Dialog>
  );
};

FlightInfoModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  airport: PropTypes.string
};

export default memo(FlightInfoModal);
