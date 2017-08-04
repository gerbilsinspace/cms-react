import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import './app.css';

import store, { history } from '../../store';
import Router from '../../router/router';
import Loading from '../loading/loading';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Loading children={
          <ConnectedRouter history={history}>
            <Router />
          </ConnectedRouter>
        } />
      </Provider>
    );
  }
}

export default App;
