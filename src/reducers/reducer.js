import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { createForms } from 'react-redux-form';

const initialLogin = {
  email: '',
  password: ''
};

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  ...createForms({
    login: initialLogin
  })
});

export default rootReducer;
