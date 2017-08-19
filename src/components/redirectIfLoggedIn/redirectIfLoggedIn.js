import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const RedirectIfLoggedIn = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      rest.profile.isEmpty ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/cms',
            state: {
              from: props.location,
            },
          }}
        />
      )
    )}
  />
);

const mapStateToProps = state => ({
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(RedirectIfLoggedIn);
