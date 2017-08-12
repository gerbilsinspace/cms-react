import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { actions } from 'react-redux-form';
import { compose } from 'redux';
import CMSList from '../../components/cmsList';

const Partials = ({
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
           itemNameLowercase='partial'
           itemNameLowercasePlural='partials'
           itemNameUppercase='Partial'
           itemNameUppercasePlural='Partials'
           itemFirebaseUrl='/partials'
  />
);

const mapStateToProps = state => ({
  items: state.firebase.ordered.partials,
  submitFailed: state.forms.createPartial.$form.submitFailed,
  nameErrors: state.forms.createPartial.name.errors
});

const mapDispatchToProps = dispatch => ({
  clearItemAction: () => {
    dispatch(actions.change('createPartial.name', ''));
  }
});

export default compose(
  firebaseConnect([
    'partials#orderByChild=name'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Partials);
