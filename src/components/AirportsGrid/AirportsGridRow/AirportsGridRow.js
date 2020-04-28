import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import styles from './AirportsGridRow.module.css';

const AirportsGridRow = ({ airportId, openModal }) => {
  return (
    <div className={styles.airportsGridRow}>
      <span className={styles.airportsGridRowId}>{airportId}</span>
      <Button onClick={() => openModal(airportId)}>Show more</Button>
    </div>
  );
};

AirportsGridRow.propTypes = {
  openModal: PropTypes.func,
  airportId: PropTypes.string,
};

export default memo(AirportsGridRow);
