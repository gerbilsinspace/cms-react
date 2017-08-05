import './cmsLayout.css';
import React, { Component } from 'react';
import CMSSidebar from '../cmsSidebar/cmsSidebar';

class CMSLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="cms">
        <CMSSidebar />
        { children }
      </div>
    );
  }
};

export default CMSLayout;
