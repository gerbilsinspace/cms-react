import React from 'react';
import ReactDOM from 'react-dom';
import Error404 from './Error404';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Error404 />, div);
});
