import React from 'react';
import { Link } from 'react-router-dom';

const PageItem = ({ page }) => (
  <div>{page.name} <Link to={`/cms/pages/${page.key}`}>Edit</Link></div>
);

export default PageItem;

