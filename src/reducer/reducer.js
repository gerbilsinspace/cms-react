import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';
import { createForms } from 'react-redux-form';
import models from '../models';

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  router: routerReducer,
  ...createForms({
    login: models.login,
    register: models.register,
    forgottenPassword: models.forgottenPassword,
    resetPassword: models.resetPassword,
    createMenu: models.createMenu,
    addLinkToMenu: models.addLinkToMenu,
    createTemplate: models.createTemplate,
    createPage: models.createPage
  })
});

export default rootReducer;
