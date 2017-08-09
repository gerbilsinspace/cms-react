import React from 'react';
import ReactDOM from 'react-dom';
import Partials from './cmsPartials';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Partials />, div);
});
