import React from 'react';
import ReactDOM from 'react-dom';
import CMSSidebar from './cmsSidebar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMSSidebar />, div);
});
