import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import GoogleButton from 'react-google-button';
import { Control, Form } from 'react-redux-form';
import { compose } from 'redux';
import { isEmail } from 'validator';
import addStyle from '../../helpers/addStyle';
import { required, passwordsMatch } from '../../helpers/error';

class Register extends Component {
  constructor(props) {
    super(props);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithTwitter = this.loginWithTwitter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      error: '',
    };
  }

  handleSubmit(val) {
    const { firebase } = this.props;

    firebase.createUser({
      email: val.email,
      password: val.password,
    }).catch((error) => {
      this.setState({ error: error.message });
    });
  }

  loginWithGoogle() {
    const { firebase } = this.props;

    firebase.login({
      provider: 'google',
      type: 'popup',
    }).catch((error) => {
      this.setState({ error: error.message });
    });
  }

  loginWithFacebook() {
    const { firebase } = this.props;

    firebase.login({
      provider: 'facebook',
      type: 'popup',
    }).catch((error) => {
      this.setState({ error: error.message });
    });
  }

  loginWithTwitter() {
    const { firebase } = this.props;

    firebase.login({
      provider: 'twitter',
      type: 'popup',
    }).catch((error) => {
      this.setState({ error: error.message });
    });
  }

  render() {
    const {
      submitFailed,
      formErrors,
      emailErrors,
      passwordErrors,
      passwordConfirmErrors,
    } = this.props;
    const isError = this.state.error ||
      (submitFailed &&
       (formErrors.passwordsMatch ||
        emailErrors.required ||
        emailErrors.isEmail ||
        passwordErrors.required ||
        passwordConfirmErrors.required)
      );
    const firebaseErrorStyle = addStyle(this.state.error);
    const formErrorStyle = addStyle(isError);
    const passwordsMatchErrorStyle = addStyle(submitFailed && formErrors.passwordsMatch);
    const emailRequiredErrorStyle = addStyle(submitFailed && emailErrors.required);
    const isEmailErrorStyle = addStyle(submitFailed && emailErrors.isEmail);
    const passwordRequiredErrorStyle = addStyle(submitFailed && passwordErrors.required);
    const passwordConfirmRequiredErrorStyle = addStyle(
      submitFailed && passwordConfirmErrors.required,
    );

    return (
      <div className="register">
        <h1>Register</h1>

        <Form
          model="register"
          onSubmit={(val) => {
            this.handleSubmit(val);
          }}
          validators={{
            '': { passwordsMatch },
            email: { required, isEmail },
            password: { required },
            passwordConfirm: { required },
          }}
        >
          <div style={formErrorStyle}>
            <h2>Error</h2>
            <p>You have one or more errors below</p>
            <div style={firebaseErrorStyle}>{ this.state.error }</div>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Control type="email" model=".email" />
            <div style={emailRequiredErrorStyle}>An Email is required.</div>
            <div style={isEmailErrorStyle}>Please provide a valid email.</div>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Control type="password" model=".password" />
            <div style={passwordRequiredErrorStyle}>Please provide a password.</div>
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <Control type="password" model=".passwordConfirm" />
            <div style={passwordConfirmRequiredErrorStyle}>Please provide a second password.</div>
            <div style={passwordsMatchErrorStyle}>Your passwords do not match.</div>
          </div>
          <button>Submit</button>
        </Form>

        <GoogleButton
          onClick={() => {
            this.loginWithGoogle();
          }}
        />

        <button
          onClick={() => {
            this.loginWithFacebook();
          }}
        >
          <img
            alt="Login with Facebook"
            src="/login-facebook.png"
          />
        </button>

        <button
          onClick={() => {
            this.loginWithTwitter();
          }}
        >
          <img
            alt="Login with Twitter"
            src="/login-twitter.png"
          />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  submitFailed: state.forms.register.$form.submitFailed,
  formErrors: state.forms.register.$form.errors,
  emailErrors: state.forms.register.email.errors,
  passwordErrors: state.forms.register.password.errors,
  passwordConfirmErrors: state.forms.register.passwordConfirm.errors,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Register);

