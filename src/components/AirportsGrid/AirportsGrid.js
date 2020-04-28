import React, { useState, memo, useCallback, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import AirportsGridRow from './AirportsGridRow';
import FlightsInfoModal from '../FlightsInfoModal';
import { getAirportsAction } from '../../store/actions';

import styles from './AirportsGrid.module.css';

const AirportsGrid = () => {
  const dispatch = useDispatch();
  const airports = useSelector((state) => state.flightReducer.airports || []);

  const [selectedAirportId, setSelectedAirportId] = useState('');
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const openModal = useCallback(
    (airportId) => {
      setSelectedAirportId(airportId);
      setModalIsOpened(true);
    },
    [setSelectedAirportId, setModalIsOpened]
  );

  const closeModal = useCallback(() => {
    setSelectedAirportId('');
    setModalIsOpened(false);
  }, [setSelectedAirportId, setModalIsOpened]);

  useEffect(() => {
    if (!airports.length) {
      dispatch(getAirportsAction())
    }
  }, [airports.length, dispatch]);

  return (
    <>
      <Paper className={styles.airportsGridContainer} elevation={3}>
        <div className={styles.airportsGridTitle}>Main airports</div>
        <Grid
          className={styles.airportsGrid}
          wrap="nowrap"
          spacing={1}
          container
          direction="column"
        >
          <Grid item>
            <div className={styles.gridLegend}>
              <span>Airport id</span>
            </div>
          </Grid>
          {airports.length ? (
            airports.map((id) => (
              <Grid item key={id}>
                <AirportsGridRow
                  openModal={openModal}
                  key={id}
                  airportId={id}
                />
              </Grid>
            ))
          ) : (
            <CircularProgress size={20} />
          )}
        </Grid>
      </Paper>
      <FlightsInfoModal
          open={modalIsOpened}
          handleClose={closeModal}
          airportId={selectedAirportId}
      />
    </>
  );
};

export default memo(AirportsGrid);
