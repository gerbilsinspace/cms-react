import React from 'react';
import ReactDOM from 'react-dom';
import ForgottenPassword from './ForgottenPassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ForgottenPassword />, div);
});
