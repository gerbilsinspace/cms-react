import './loading.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loading extends Component {
  render() {
    const { profile, children } = this.props;

    if (!profile || !profile.isLoaded) {
      return (
        <div className="loading">
          <h1>Loading</h1>
        </div>
      );
    }

    return children;
  }
};

const mapStateToProps = state => ({
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(Loading);
