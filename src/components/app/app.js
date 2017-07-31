import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './app.css';

import store from '../../store';
import Router from '../../router/router';
import Loading from '../loading/loading';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Loading children={ <Router /> } />
      </Provider>
    );
  }
}

export default App;
