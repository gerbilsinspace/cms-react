import React from 'react';
import ReactDOM from 'react-dom';
import CMSList from './cmsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMSList />, div);
});
