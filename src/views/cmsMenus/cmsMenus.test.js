import React from 'react';
import ReactDOM from 'react-dom';
import Menus from './cmsMenus';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Menus />, div);
});
