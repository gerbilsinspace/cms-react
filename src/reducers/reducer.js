import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { createForms } from 'react-redux-form';

const initialLogin = {
  email: '',
  password: ''
};

const initialRegister = {
  email: '',
  password: '',
  passwordConfirm: ''
};

const initialForgottenPassword = {
  email: ''
};

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  ...createForms({
    login: initialLogin,
    register: initialRegister,
    forgottenPassword: initialForgottenPassword
  })
});

export default rootReducer;
