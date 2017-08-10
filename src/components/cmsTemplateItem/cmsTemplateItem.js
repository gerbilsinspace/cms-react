import React from 'react';
import { Link } from 'react-router-dom';

const TemplateItem = ({ template }) => (
  <div>{template.name} <Link to={`/cms/templates/${template.key}`}>Edit</Link></div>
);

export default TemplateItem;

