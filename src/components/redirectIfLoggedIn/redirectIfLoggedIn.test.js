import React from 'react';
import ReactDOM from 'react-dom';
import RedirectIfLoggingIn from './redirectIfLoggingIn';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RedirectIfLoggingIn />, div);
});
