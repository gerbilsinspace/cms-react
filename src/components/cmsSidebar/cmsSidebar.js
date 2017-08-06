import './cmsSidebar.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../logout/logout';

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
    </ul>
  </div>
);

const mapStateToProps = state => ({
  user: state.firebase.auth.email || state.firebase.auth.displayName
});

export default connect(mapStateToProps)(CMSSidebar);
