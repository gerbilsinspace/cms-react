import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  role,
  userKeyLength,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (rest.profile.isEmpty) { // if user has no valid account
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }

      if (!role) { // first time user has logged in, has no role set.
        if (userKeyLength === 1) {
          rest.firebase.updateProfile({
            role: 'owner',
          });
        } else if (userKeyLength > 1) {
          rest.firebase.updateProfile({
            role: 'unauthorised',
          });
        }
      }

      if (role === 'unauthorised') { // if admin hasn't given user edit rights
        return (
          <Redirect
            to={{
              pathname: '/unauthorised',
              state: { from: props.location },
            }}
          />
        );
      }

      return (
        <Component {...props} />
      );
    }}
  />
);

const mapStateToProps = (state) => {
  let userKeyLength = 0;

  if (state.firebase.data.users) {
    userKeyLength = Object.keys(state.firebase.data.users).length;
  }

  return {
    profile: state.firebase.profile,
    userKeyLength,
    role: state.firebase.profile.role,
  };
};

export default compose(
  firebaseConnect([
    'users',
  ]),
  connect(mapStateToProps),
)(ProtectedRoute);
