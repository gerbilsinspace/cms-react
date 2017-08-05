import React from 'react';
import ReactDOM from 'react-dom';
import CMSMenuItem from './cmsMenuItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMSMenuItem />, div);
});
