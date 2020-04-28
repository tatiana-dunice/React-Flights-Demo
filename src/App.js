import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

import styles from './App.module.css';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <section className={styles.appMainContent}>
        <Router>
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/home'} component={HomePage} />
          <Route path={'*'} render={() => <Redirect to={'/login'} />} />
        </Router>
      </section>
    </Provider>
  );
};

export default App;
