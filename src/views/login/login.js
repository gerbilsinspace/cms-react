import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import GoogleButton from 'react-google-button';
import { Control, Form } from 'react-redux-form';
import { isEmail } from 'validator';
import addStyle from '../../helpers/addStyle';
import { required } from '../../helpers/error';

class Login extends Component {
  constructor(props) {
    super(props);

    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithTwitter = this.loginWithTwitter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      error: ''
    }
  }

  loginWithGoogle() {
    const { firebase } = this.props;

    firebase.login({
      provider: 'google',
      type: 'popup'
    }).catch(error => {
      this.setState({ error: error.message });
    });
  }

  loginWithFacebook() {
    const { firebase } = this.props;

    firebase.login({
      provider: 'facebook',
      type: 'popup'
    }).catch(error => {
      this.setState({ error: error.message });
    });
  }

  loginWithTwitter() {
    const { firebase } = this.props;

    firebase.login({
      provider: 'twitter',
      type: 'popup'
    }).catch(error => {
      this.setState({ error: error.message });
    });
  }

  handleSubmit(val) {
    const { firebase } = this.props;

    firebase.login({
      email: val.email,
      password: val.password
    }).catch(error => {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          this.setState({ error: 'Please check your email and password are correct.' });
          break;
        default:
          this.setState({ error: error.message });
          break;
      }
    });
  }

  render() {
    const { submitFailed, emailErrors, passwordErrors } = this.props;

    const isError = this.state.error || (submitFailed && (emailErrors.required || emailErrors.isEmail || passwordErrors.required ));
    const firebaseErrorStyle = addStyle(this.state.error);
    const formErrorStyle = addStyle(isError);
    const emailRequiredErrorStyle = addStyle(submitFailed && emailErrors.required);
    const isEmailErrorStyle = addStyle(submitFailed && emailErrors.isEmail);
    const passwordRequiredErrorStyle = addStyle(submitFailed && passwordErrors.required);

    return (
      <div className="login">
        <h1>Login</h1>

        <Form model="login"
              onSubmit={(val) => this.handleSubmit(val)}
              validators={{
                email: { required, isEmail },
                password: { required }
              }}
        >
          <div style={formErrorStyle}>
            <h2>Error</h2>
            <p>You have one or more errors below</p>
            <div style={firebaseErrorStyle}>{ this.state.error }</div>
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Control type='email' model='.email' />
            <div style={emailRequiredErrorStyle}>An email is required</div>
            <div style={isEmailErrorStyle}>Please provide a valid email address.</div>
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Control type='password' model='.password' />
            <div style={passwordRequiredErrorStyle}>Please provide a password</div>
          </div>

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

export default firebaseConnect()(Login);

