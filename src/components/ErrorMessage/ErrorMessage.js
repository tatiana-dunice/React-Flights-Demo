import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ acceptError, errorMessage }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      acceptError();
      clearTimeout(timeout);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [acceptError]);

  return ReactDOM.createPortal(
    <div className={styles.errorContainer}>
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>,
    document.getElementById('error-portal')
  );
};

ErrorMessage.propTypes = {
  acceptError: PropTypes.func,
  errorMessage: PropTypes.string,
}

export default memo(ErrorMessage);
