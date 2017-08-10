import React from 'react';
import ReactDOM from 'react-dom';
import CMSPageItem from './cmsPageItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMSPageItem />, div);
});
