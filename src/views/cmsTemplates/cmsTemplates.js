import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { actions } from 'react-redux-form';
import { compose } from 'redux';
import CMSList from '../../components/cmsList';

const Templates = ({
  submitFailed,
  nameErrors,
  items,
  firebase,
  clearItemAction,
}) => (
  <CMSList
    items={items}
    submitFailed={submitFailed}
    nameErrors={nameErrors}
    firebase={firebase}
    clearItemAction={clearItemAction}
    itemNameLowercase="template"
    itemNameLowercasePlural="templates"
    itemNameUppercase="Template"
    itemNameUppercasePlural="Templates"
    itemFirebaseUrl="/templates"
  />
);

const mapStateToProps = state => ({
  items: state.firebase.ordered.templates,
  submitFailed: state.forms.createTemplate.$form.submitFailed,
  nameErrors: state.forms.createTemplate.name.errors,
});

const mapDispatchToProps = dispatch => ({
  clearItemAction: () => {
    dispatch(actions.change('createTemplate.name', ''));
  },
});

export default compose(
  firebaseConnect([
    '/templates#orderByChild=name',
  ]),
  connect(mapStateToProps, mapDispatchToProps),
)(Templates);
