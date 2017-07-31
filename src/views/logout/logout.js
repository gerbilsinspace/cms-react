import './logout.css';
import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { firebase } = this.props;

    firebase.logout();
  }

  render() {
    return (
      <div className="logout">
        <button onClick={() => {
          this.logout();
        }}>Logout</button>
      </div>
    );
  }
}

export default firebaseConnect()(Logout);
