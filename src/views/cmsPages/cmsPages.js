import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { actions } from 'react-redux-form';
import { compose } from 'redux';
import CMSList from '../../components/cmsList';

const Pages = ({
  items,
  submitFailed,
  nameErrors,
  firebase,
  clearItemAction
}) => (
  <CMSList items={items}
           submitFailed={submitFailed}
           nameErrors={nameErrors}
           firebase={firebase}
           clearItemAction={clearItemAction}
           itemNameLowercase='page'
           itemNameUppercase='Page'
           itemNameUppercasePlural='Pages'
           itemFirebaseUrl='/pages'
  />
);

const mapStateToProps = state => ({
  items: state.firebase.ordered.pages,
  submitFailed: state.forms.createPage.$form.submitFailed,
  nameErrors: state.forms.createPage.name.errors
});

const mapDispatchToProps = dispatch => ({
  clearItemAction: () => {
    dispatch(actions.change('createPage.name', ''));
  }
});

export default compose(
  firebaseConnect([
    'pages#orderByChild=name'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Pages);
