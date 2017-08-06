import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './cmsMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Menu />, div);
});
