import React from 'react';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import ORYHeaderPlugin from './oryHeaderPlugin';
import './oryHeaderPlugin.css';

export default {
  Component: ORYHeaderPlugin,
  IconComponent: <StarIcon />,
  name: 'gerbilsinspace/header-plugin',
  version: '0.0.1',
  text: 'Header',
};

