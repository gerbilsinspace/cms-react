import './register.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    this.state = {
      error: ''
    }
  }

  handleSubmit(val) {
    const { firebase } = this.props;

    firebase.createUser({
      email: val.email,
      password: val.password
    }).catch(error => {
      this.setState({ error: error.message });
    });
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

  render() {
    const { submitFailed, formErrors, emailErrors, passwordErrors, passwordConfirmErrors } = this.props;
    const displayBlock = {display: 'block'};
    const displayNone = {display: 'none'};

    const isError = this.state.error || (submitFailed && (formErrors.passwordsMatch || emailErrors.required || emailErrors.isEmail || passwordErrors.required || passwordConfirmErrors.required));

    const firebaseErrorStyle = this.state.error ? displayBlock : displayNone;
    const formErrorStyle = isError ? displayBlock : displayNone;
    const passwordsMatchErrorStyle = (submitFailed && formErrors.passwordsMatch) ? displayBlock : displayNone;
    const emailRequiredErrorStyle = (submitFailed && emailErrors.required) ? displayBlock : displayNone;
    const isEmailErrorStyle = (submitFailed && emailErrors.isEmail) ? displayBlock : displayNone;
    const passwordRequiredErrorStyle = (submitFailed && passwordErrors.required) ? displayBlock : displayNone;
    const passwordConfirmRequiredErrorStyle = (submitFailed && passwordConfirmErrors.required) ? displayBlock : displayNone;

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
          <div style={formErrorStyle}>
            <h2>Error</h2>
            <p>You have one or more errors below</p>
            <div style={firebaseErrorStyle}>{ this.state.error }</div>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Control type='email' model='.email' />
            <div style={emailRequiredErrorStyle}>An Email is required.</div>
            <div style={isEmailErrorStyle}>Please provide a valid email.</div>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Control type='password' model='.password' />
            <div style={passwordRequiredErrorStyle}>Please provide a password.</div>
            <div style={passwordsMatchErrorStyle}>Your passwords do not match.</div>
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <Control type='password' model='.passwordConfirm' />
            <div style={passwordConfirmRequiredErrorStyle}>Please provide a second password.</div>
            <div style={passwordsMatchErrorStyle}>Your passwords do not match.</div>
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

const mapStateToProps = (state) => ({
  submitFailed: state.forms.register.$form.submitFailed,
  formErrors: state.forms.register.$form.errors,
  emailErrors: state.forms.register.email.errors,
  passwordErrors: state.forms.register.password.errors,
  passwordConfirmErrors: state.forms.register.passwordConfirm.errors
});

const wrappedRegister = firebaseConnect()(Register);
export default connect(mapStateToProps)(wrappedRegister);
