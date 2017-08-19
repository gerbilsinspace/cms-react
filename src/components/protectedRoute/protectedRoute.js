import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import {
  Route,
  Redirect
} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    if (!rest.profile.isEmpty) {
      if (!rest.profile.role) {
        if (rest.userKeyLength === 1) {
          rest.firebase.updateProfile({
            role: 'owner'
          });
        } else if (rest.userKeyLength > 1) {
          rest.firebase.updateProfile({
            role: 'unauthorised'
          });
        }
      }

      return (
        <Component {...props} />
      );
    }

    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  }} />
);

const mapStateToProps = (state) => {
  let userKeyLength = 0;

  if (state.firebase.data.users) {
    userKeyLength = Object.keys(state.firebase.data.users).length;
  }

  return {
    profile: state.firebase.profile,
    userKeyLength: userKeyLength
  };
}

export default compose(
  firebaseConnect([
    'users'
  ]),
  connect(mapStateToProps)
)(ProtectedRoute);
