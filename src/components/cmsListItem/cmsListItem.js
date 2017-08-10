import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ name, itemKey, type }) => (
  <div>{name} <Link to={`/cms/${type}/${itemKey}`}>Edit</Link></div>
);

export default ListItem;

