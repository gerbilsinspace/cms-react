import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../views/login/login';
import Logout from '../views/logout/logout';
import Register from '../views/register/register';
import Error404 from '../views/error404/error404';
import CMS from '../views/cms/cms';

import ProtectedRoute from '../components/protectedRoute/protectedRoute';

class Routing extends Component {
  render() {
    return (
      <Router>
          <div className="app">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path='/register' component={Register} />
              <ProtectedRoute path='/cms' component={CMS} />
              <Route component={Error404} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default Routing;

