import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from '../../store';
import Router from '../../router';
import Loading from '../loading';

const App = () => (
  <Provider store={store}>
    <Loading>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Loading>
  </Provider>
);

export default App;

