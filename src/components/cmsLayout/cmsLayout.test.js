import React from 'react';
import ReactDOM from 'react-dom';
import CMSLayout from './cmsLayout';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMSLayout />, div);
});
