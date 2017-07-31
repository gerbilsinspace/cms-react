import './login.css';
import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import GoogleButton from 'react-google-button';
import { Control, Form } from 'react-redux-form';
import { isEmail, isEmpty } from 'validator';

const required = str => !isEmpty(str);

class Login extends Component {
  constructor(props) {
    super(props);

    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(val) {
    const { firebase } = this.props;

    firebase.login({
      email: val.email,
      password: val.password
    });
  }

  render() {
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
          <label htmlFor="email">Email:</label>
          <Control type='email' model='.email' />

          <label htmlFor="password">Password:</label>
          <Control type='password' model='.password' />

          <button>Submit</button>
        </Form>
        <GoogleButton onClick={() => {
          this.loginWithGoogle();
        }} />
        <img src='https://scontent-lhr3-1.xx.fbcdn.net/v/t39.2365-6/17639236_1785253958471956_282550797298827264_n.png?oh=d35ce789e109b25a89cd6803cbc30c7f&oe=59EBCBEA'
             onClick={() => {
               this.loginWithFacebook();
             }}
        />
      </div>
    );
  }
}

export default firebaseConnect()(Login);
