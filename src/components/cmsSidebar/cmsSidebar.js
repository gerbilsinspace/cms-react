import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../logout';

const CMSSidebar = ({ user }) => (
  <div className="cms-sidebar">
    <div className="logo">
      <Link to='/cms'>CMS</Link>
    </div>
    <div className="profile">
      <div>You are logged in as {user}</div>
      <Logout />
    </div>
    <ul className="menu">
      <li>
        <Link to='/cms/menus'>Menus</Link>
      </li>
      <li>
        <Link to='/cms/templates'>Templates</Link>
      </li>
      <li>
        <Link to='/cms/partials'>Partials</Link>
      </li>
      <li>
        <Link to='/cms/pages'>Pages</Link>
      </li>
    </ul>
  </div>
);

const mapStateToProps = state => ({
  user: state.firebase.auth.email || state.firebase.auth.displayName
});

export default connect(mapStateToProps)(CMSSidebar);
