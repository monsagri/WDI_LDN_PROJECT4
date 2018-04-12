import React from 'react';
import Auth from './Auth';
import { Route, Redirect } from 'react-router-dom';

import Flash from './Flash';

const PrivateRoute =  ({ component: Component, ...rest }) => {
  console.log(Auth.isAuthenticated());
  return <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated() ?
        <Component {...props} />
        : (
          Flash.setMessage('danger', 'You must be logged in to view this page'),
          <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
        )
    }
  />;
};

export default PrivateRoute;
