import './cmsMenuItem.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuItem extends Component {
  render() {
    const { menu } = this.props;

    return (
      <div>{menu.name} <Link to={`/cms/menus/${menu.key}`}>Edit</Link></div>
    );
  }
};

export default MenuItem;
