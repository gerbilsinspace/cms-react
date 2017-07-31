import './protectedRoute.css';
import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import {
  Route,
  Redirect
} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !rest.profile.isEmpty ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const wrappedProtectedRoute = firebaseConnect()(ProtectedRoute);

const mapStateToProps = (state) => ({
  profile: state.firebase.profile
})
export default connect(mapStateToProps)(wrappedProtectedRoute);
