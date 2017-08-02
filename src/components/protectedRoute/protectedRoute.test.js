import React from 'react';
import ReactDOM from 'react-dom';
import ProtectedRoute from './ProtectedRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProtectedRoute />, div);
});
