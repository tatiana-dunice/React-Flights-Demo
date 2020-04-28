import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AirportsGrid from '../AirportsGrid';

const HomePage = () => {
  const isAuthorized = useSelector((state) => state.authReducer.isAuthorized);

  return <>{isAuthorized ? <AirportsGrid /> : <Redirect to={'/login'} />}</>;
};

export default memo(HomePage);
