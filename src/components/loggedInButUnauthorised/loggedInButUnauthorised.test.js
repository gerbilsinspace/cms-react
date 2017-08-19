import React from 'react';
import ReactDOM from 'react-dom';
import LoggedInButUnauthorised from './loggedInButUnauthorised';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoggedInButUnauthorised />, div);
});
