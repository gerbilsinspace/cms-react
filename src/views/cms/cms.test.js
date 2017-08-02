import React from 'react';
import ReactDOM from 'react-dom';
import CMS from './CMS';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMS />, div);
});
