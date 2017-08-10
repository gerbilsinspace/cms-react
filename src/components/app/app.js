import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import './app.css';

import store, { history } from '../../store';
import Router from '../../router';
import Loading from '../loading';

const App = () => (
  <Provider store={store}>
    <Loading children={
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    } />
  </Provider>
);

export default App;

