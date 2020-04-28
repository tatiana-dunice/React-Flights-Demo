import React, { useCallback, useState, useMemo, memo } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, CircularProgress, Paper } from '@material-ui/core';

import { userLoginAction, acceptErrorAction } from '../../store/actions';
import ErrorMessage from '../ErrorMessage';

import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isAuthorized, isLoading, error } = useSelector(
    (state) => state.authReducer
  );

  const acceptError = useCallback(() => dispatch(acceptErrorAction()), [
    dispatch,
  ]);

  const userLoginHandler = useCallback(() => {
    dispatch(userLoginAction({ username, password }));
  }, [dispatch, password, username]);

  const loginButtonIsDisabled = useMemo(() => !(username && password), [
    username,
    password,
  ]);

  return (
    <>
      {isAuthorized ? (
        <Redirect to={'/home'} />
      ) : (
        <div className={styles.loginBlockContainer}>
          <Paper className={styles.loginBlock} elevation={3}>
            <span className={styles.loginBlockTitle}>LOGIN</span>
            <Input
              className={styles.loginBlockInput}
              color="primary"
              defaultValue={username}
              placeholder={'Username'}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              className={styles.loginBlockInput}
              color="primary"
              defaultValue={password}
              placeholder={'Password'}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.loginButtonContainer}>
              {isLoading ? (
                <CircularProgress color="primary" size="21px" />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={userLoginHandler}
                  disabled={loginButtonIsDisabled}
                  fullWidth
                >
                  LOGIN
                </Button>
              )}
            </div>
          </Paper>
        </div>
      )}
      {!!error && (
        <ErrorMessage errorMessage={error} acceptError={acceptError} />
      )}
    </>
  );
};

export default memo(LoginPage);
