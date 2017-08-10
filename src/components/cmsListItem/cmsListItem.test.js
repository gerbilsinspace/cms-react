import React from 'react';
import ReactDOM from 'react-dom';
import CMSListItem from './cmsListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMSListItem />, div);
});
