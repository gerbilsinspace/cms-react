import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { actions } from 'react-redux-form';
import { compose } from 'redux';
import CMSList from '../../components/cmsList';

const Menus = ({
  items,
  submitFailed,
  nameErrors,
  firebase,
  clearItemAction,
}) => (
  <CMSList
    items={items}
    submitFailed={submitFailed}
    nameErrors={nameErrors}
    firebase={firebase}
    clearItemAction={clearItemAction}
    itemNameLowercase="menu"
    itemNameLowercasePlural="menus"
    itemNameUppercase="Menu"
    itemNameUppercasePlural="Menus"
    itemFirebaseUrl="/menus"
  />
);

const mapStateToProps = state => ({
  items: state.firebase.ordered.pages,
  submitFailed: state.forms.createMenu.$form.submitFailed,
  nameErrors: state.forms.createMenu.name.errors,
});

const mapDispatchToProps = dispatch => ({
  clearItemAction: () => {
    dispatch(actions.change('createMenu.name', ''));
  },
});

export default compose(
  firebaseConnect([
    'menus#orderByChild=name',
  ]),
  connect(mapStateToProps, mapDispatchToProps),
)(Menus);
