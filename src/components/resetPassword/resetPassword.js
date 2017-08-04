import './resetPassword.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Control, Form } from 'react-redux-form';
import { isEmpty } from 'validator';

const required = str => !isEmpty(str);

const passwordsMatch = ({ password, passwordConfirm }) => {
  return password === passwordConfirm;
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      error: ''
    }
  }

  handleSubmit(val) {
    const { code, firebase } = this.props;

    firebase.confirmPasswordReset(code, val.password).then(() => {
      window.location = '/login';
    }).catch(err => {
      this.setState({error: err.message});
    });
  }

  render() {
    const { submitFailed, formErrors, passwordErrors, passwordConfirmErrors } = this.props;
    const displayBlock = {display: 'block'};
    const displayNone = {display: 'none'};

    const isError = this.state.error || (submitFailed && (formErrors.passwordsMatch || passwordErrors.required || passwordConfirmErrors.required));

    const firebaseErrorStyle = this.state.error ? displayBlock : displayNone;
    const formErrorStyle = isError ? displayBlock : displayNone;
    const passwordsMatchErrorStyle = (submitFailed && formErrors.passwordsMatch) ? displayBlock : displayNone;
    const passwordRequiredErrorStyle = (submitFailed && passwordErrors.required) ? displayBlock : displayNone;
    const passwordConfirmRequiredErrorStyle = (submitFailed && passwordConfirmErrors.required) ? displayBlock : displayNone;

    return (
      <div className='reset-password'>
        <h1>Reset Password</h1>

        <Form model='resetPassword'
              onSubmit={val => this.handleSubmit(val)}
              validators={{
                "": { passwordsMatch },
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
            <label htmlFor="password">Password:</label>
            <Control type='password' model='.password' />
            <div style={passwordRequiredErrorStyle}>Please provide a password.</div>
            <div style={passwordsMatchErrorStyle}>Your passwords do not match.</div>
          </div>
          <div>
            <label htmlFor='passwordConfirm'>Confirm Password:</label>
            <Control type='password' model='.passwordConfirm' />
            <div style={passwordConfirmRequiredErrorStyle}>Please provide a password.</div>
            <div style={passwordsMatchErrorStyle}>Your passwords do not match.</div>
          </div>
          <button>Submit</button>
        </Form>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  submitFailed: state.forms.resetPassword.$form.submitFailed,
  formErrors: state.forms.resetPassword.$form.errors,
  passwordErrors: state.forms.resetPassword.password.errors,
  passwordConfirmErrors: state.forms.resetPassword.passwordConfirm.errors
});

const wrappedResetPassword = firebaseConnect()(ResetPassword);
export default connect(mapStateToProps)(wrappedResetPassword);
