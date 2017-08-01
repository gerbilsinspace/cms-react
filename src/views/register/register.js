import './register.css';
import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import GoogleButton from 'react-google-button';
import { Control, Form } from 'react-redux-form';
import { isEmail, isEmpty } from 'validator';

const required = str => !isEmpty(str);

const passwordsMatch = ({ password, passwordConfirm }) => {
  return password === passwordConfirm;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithTwitter = this.loginWithTwitter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(val) {
    const { firebase } = this.props;

    firebase.createUser({
      email: val.email,
      password: val.password
    });
  }

  loginWithGoogle() {
    const { firebase } = this.props;

    firebase.login({
      provider: 'google',
      type: 'popup'
    });
  }i

  loginWithFacebook() {
    const { firebase } = this.props;

    firebase.login({
      provider: 'facebook',
      type: 'popup'
    });
  }

  loginWithTwitter() {
    const { firebase } = this.props;

    firebase.login({
      provider: 'twitter',
      type: 'popup'
    });
  }


  render() {
    return (
      <div className="register">
        <h1>Register</h1>

        <Form model="register"
              onSubmit={(val) => this.handleSubmit(val)}
              validators={{
                "": { passwordsMatch },
                email: { required, isEmail },
                password: { required },
                passwordConfirm: { required }
              }}
        >
          <label htmlFor="email">Email:</label>
          <Control type='email' model='.email' />

          <label htmlFor="password">Password:</label>
          <Control type='password' model='.password' />

          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <Control type='password' model='.passwordConfirm' />

          <button>Submit</button>
        </Form>

        <GoogleButton onClick={() => {
          this.loginWithGoogle();
        }} />

        <img alt="Login with Facebook" src='/login-facebook.png'
             onClick={() => {
               this.loginWithFacebook();
             }}
        />

        <img alt="Login with Twitter" src='/login-twitter.png'
             onClick={() => {
               this.loginWithTwitter();
             }}
        />
      </div>
    );
  }
}

export default firebaseConnect()(Register);
