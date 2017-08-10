import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ menu }) => (
  <div>{menu.name} <Link to={`/cms/menus/${menu.key}`}>Edit</Link></div>
);

export default MenuItem;

