import './cmsMenu.css';
import React from 'react';
import CMSLayout from '../../components/cmsLayout/cmsLayout';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Menu = ({ menu }) => (
  <CMSLayout>
    <article>
      <h1>Menu: { menu.name }</h1>
    </article>
  </CMSLayout>
);

const mapStateToProps = (state, ownProps) => {
  const menus = state.firebase.data.menus;
  let menu = {
    name: ''
  };

  if (menus) {
    menu = state.firebase.data.menus[ownProps.match.params.id];
  }

  return {
    menu
  };
}

export default compose(
  firebaseConnect(['/menus#orderByChild=name']),
  connect(mapStateToProps)
)(Menu);
