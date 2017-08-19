import React from 'react';
import ReactDOM from 'react-dom';
import Unauthorised from './unauthorised';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Unauthorised />, div);
});
