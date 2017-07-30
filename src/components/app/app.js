import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './app.css';

import store from '../../store';

import Login from '../login/login';
import Logout from '../logout/logout';
import Register from '../register/register';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Login />
          <Logout />
          <Register />
        </div>
      </Provider>
    );
  }
}

export default App;
