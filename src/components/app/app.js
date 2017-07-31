import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.css';

import store from '../../store';

import Login from '../login/login';
import Logout from '../logout/logout';
import Register from '../register/register';
import Error404 from '../../views/error404/error404';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path='/register' component={Register} />
              <Route component={Error404} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
