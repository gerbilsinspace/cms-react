import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CMS from '../views/cms/cms';
import CMSTemplates from '../views/cmsTemplates/cmsTemplates';
import CMSTemplate from '../views/cmsTemplate/cmsTemplate';
import CMSMenus from '../views/cmsMenus/cmsMenus';
import CMSMenu from '../views/cmsMenu/cmsMenu';
import CMSPages from '../views/cmsPages/cmsPages';
import CMSPage from '../views/cmsPage/cmsPage';
import CMSPartials from '../views/cmsPartials/cmsPartials';
import CMSPartial from '../views/cmsPartial/cmsPartial';
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
              <ProtectedRoute path='/cms/menus/:id' component={CMSMenu} />
              <ProtectedRoute exact path='/cms/templates' component={CMSTemplates} />
              <ProtectedRoute path='/cms/templates/:id' component={CMSTemplate} />
              <ProtectedRoute exact path='/cms/pages' component={CMSPages} />
              <ProtectedRoute path='/cms/pages/:id' component={CMSPage} />
              <ProtectedRoute exact path='/cms/partials' component={CMSPartials} />
              <ProtectedRoute path='/cms/partials/:id' component={CMSPartial} />
              <Route component={Error404} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default Routing;

