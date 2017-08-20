import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Display from './display';
import Form from './form';

const ORYHeaderPlugin = ({ readOnly, ...props }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {readOnly ? <Display {...props} /> : <Form {...props} />}
  </MuiThemeProvider>
);

export default ORYHeaderPlugin;

