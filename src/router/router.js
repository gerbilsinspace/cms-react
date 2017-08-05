import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CMS from '../views/cms/cms';
import CMSMenus from '../views/cmsMenus/cmsMenus';
import Error404 from '../views/error404/error404';
import ForgottenPassword from '../views/forgottenPassword/forgottenPassword';
import Login from '../views/login/login';
import RedirectIfLoggedIn from '../components/redirectIfLoggedIn/redirectIfLoggedIn';
import Register from '../views/register/register';
import Auth from '../views/auth/auth';
import ProtectedRoute from '../components/protectedRoute/protectedRoute';

class Routing extends Component {
  render() {
    return (
      <Router>
          <div className="app">
            <Switch>
              <RedirectIfLoggedIn path="/login" component={Login} />
              <RedirectIfLoggedIn path='/register' component={Register} />
              <RedirectIfLoggedIn path='/forgotten-password' component={ForgottenPassword} />
              <Route path='/auth' component={Auth} />
              <ProtectedRoute exact path='/cms' component={CMS} />
              <ProtectedRoute exact path='/cms/menus' component={CMSMenus} />
              <Route component={Error404} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default Routing;

