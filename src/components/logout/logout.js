import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      redirect: false,
    };
  }

  logout() {
    const { firebase } = this.props;

    firebase.logout().then(() => {
      this.setState({
        redirect: true,
      });
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/login" />
      );
    }


    return (
      <div className="logout">
        <button
          onClick={() => {
            this.logout();
          }}
        >Logout</button>
      </div>
    );
  }
}

export default firebaseConnect()(Logout);

