import './cmsMenuItem.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuItem extends Component {
  render() {
    const { id, menu } = this.props;

    return (
      <div>{id}: {menu.name} <Link to={`/cms/menus/${id}`}>Edit</Link></div>
    );
  }
};

export default MenuItem;
