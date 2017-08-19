import React from 'react';
import { connect } from 'react-redux';
import CMSLayout from '../../components/cmsLayout';

const CMS = ({role}) => {
  if (role === 'unauthorised') {
    return (
      <div>
        <h1>Unauthorised</h1>
        <p>You have not been granted access to make changes to this site. Please wait for an administrator to grant you access.</p>
      </div>
    );
  }

  return (
    <CMSLayout>
      <article>
        <h1>Dashboard</h1>
      </article>
    </CMSLayout>
  );
};

const mapStateToProps = state => ({
  role: state.firebase.profile.role
});

export default connect(mapStateToProps)(CMS);
