import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import FlightInfoRow from '../FlightInfoRow';

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
});

const ArrivingFlightsInfo = ({ data }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} classes={{ root: classes.container }}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Arrival Airport</TableCell>
            <TableCell align="right">ICAO24</TableCell>
            <TableCell align="right">Callsign</TableCell>
            <TableCell align="right">Estimated time of arrival</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <FlightInfoRow
              key={row.icao24}
              icao24={row.icao24}
              callsign={row.callsign}
              airport={row.estArrivalAirport}
              time={row.lastSeen}
            />
          ))}
          {!data.length && 'No information'}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ArrivingFlightsInfo.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      estArrivalAirport: PropTypes.string,
      icao24: PropTypes.string,
      callsign: PropTypes.string,
      lastSeen: PropTypes.number,
    })
  ),
};

export default memo(ArrivingFlightsInfo);
