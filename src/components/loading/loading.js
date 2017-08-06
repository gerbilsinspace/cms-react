import './loading.css';
import React from 'react';
import { connect } from 'react-redux';

const Loading = ({ profile, children }) => {
  if (!profile || !profile.isLoaded) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    );
  }

  return children;
};

const mapStateToProps = state => ({
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(Loading);
