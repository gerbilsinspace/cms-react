import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Display from './display';
import Form from './form';
import type { PropTypes } from './index';

const ORYHeaderPlugin = (props: PropTypes) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {props.readOnly ? <Display {...props} /> : <Form {...props} />}
  </MuiThemeProvider>
);

export default ORYHeaderPlugin;

