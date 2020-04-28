import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';

function FlightInfoRow({ airport, icao24, time, callsign }) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {airport}
      </TableCell>
      <TableCell align="right">{icao24}</TableCell>
      <TableCell align="right">{callsign}</TableCell>
      <TableCell align="right">{moment(time * 1000).format('HH:mm')}</TableCell>
    </TableRow>
  );
}

FlightInfoRow.propTypes = {
    airport: PropTypes.string,
    icao24: PropTypes.string,
    time: PropTypes.number,
    callsign: PropTypes.string
};

export default memo(FlightInfoRow);
