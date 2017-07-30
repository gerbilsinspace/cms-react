import './register.css';
import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';

class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register() {
    const { firebase } = this.props;

    firebase.createUser({
      email: 'jsphabll+2@gmail.com',
      password: 'potaytoes1'
    });
  }

  render() {
    return (
      <div className="register">
        <button onClick={() => {
          this.register();
        }}>Register</button>
      </div>
    );
  }
}

export default firebaseConnect()(Register);
