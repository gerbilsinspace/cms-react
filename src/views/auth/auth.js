import React from 'react';
import { connect } from 'react-redux';

import ResetPassword from '../../components/resetPassword';

const Auth = ({ authMode, code }) => {
  switch (authMode) {
    case 'resetPassword':
      return (
        <ResetPassword code={code} />
      );
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  authMode: (state.router.location.search.replace(/\?mode=/g, '').replace(/&[\s\S]*/g, '')),
  code: (state.router.location.search.replace(/\?mode=[\s\S]*&oobCode=/g, '').replace(/&apiKey[\s\S]*/g, '')) || '',
});

export default connect(mapStateToProps)(Auth);

