import React from 'react';
import ReactDOM from 'react-dom';
import CMSTemplateItem from './cmsTemplateItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMSTemplateItem />, div);
});
