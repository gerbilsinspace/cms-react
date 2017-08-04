import * as firebase from 'firebase';
import { createStore, compose, applyMiddleware } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers/reducer';

export const history = createHistory();
const middleware = routerMiddleware(history);

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET
};

const rrfConfig = {
  userProfile: 'users'
};

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  applyMiddleware(middleware),
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

const store = createStoreWithFirebase(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
