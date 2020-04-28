import React, { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userLogoutAction } from '../../store/actions';

import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.authReducer.username);
  const isAuthorized = useSelector((state) => state.authReducer.isAuthorized);

  const logoutHandler = useCallback(() => dispatch(userLogoutAction()), [
    dispatch,
  ]);

  return (
    <header className={styles.header}>
      <span>FLIGHTS DEMO</span>
      {isAuthorized && (
        <div className={styles.authBlock}>
          {username}
          <div className={styles.splitter} />
          <button
            className={styles.logoutButton}
            color="primary"
            variant="text"
            onClick={logoutHandler}
          >
            LOGOUT
          </button>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
