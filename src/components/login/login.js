import './login.css';
import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import GoogleButton from 'react-google-button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  loginWithGoogle() {
    const { firebase } = this.props;

    firebase.login({email: 'jsphabll@gmail.com', password: 'potaytoes1'});
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <GoogleButton onClick={() => {
          this.loginWithGoogle();
        }} />
      </div>
    );
  }
}

export default firebaseConnect()(Login);
