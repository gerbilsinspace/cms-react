import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';
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

const initialResetPassword = {
  password: '',
  passwordConfirm: ''
};

const initialCreateMenu = {
  name: ''
};

const initialAddLinkToMenu = {
  url: '',
  text: ''
}

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  router: routerReducer,
  ...createForms({
    login: initialLogin,
    register: initialRegister,
    forgottenPassword: initialForgottenPassword,
    resetPassword: initialResetPassword,
    createMenu: initialCreateMenu,
    addLinkToMenu: initialAddLinkToMenu
  })
});

export default rootReducer;
