import React, { Component } from 'react';
import CMSSidebar from '../cmsSidebar';

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
