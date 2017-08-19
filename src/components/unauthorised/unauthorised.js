import React from 'react';
import Logout from '../logout';

const Unauthorised = () => (
  <div>
    <h1>Awaiting Authorisation</h1>
    <p>In order to make edits to this website, you need an admin to give you permission.</p>
    <Logout />
  </div>
);

export default Unauthorised;
