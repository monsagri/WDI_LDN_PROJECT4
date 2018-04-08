import React from 'react';
import Auth from './Auth';
import { Route, Redirect } from 'react-router-dom';

import Flash from './Flash';

const PrivateRoute =  ({ component: Component, ...rest }) => {
  Flash.setMessage('danger', 'You must be logged in to view this message');
  return <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated ? (

        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      ) : <Component {...props} />
    }
  />;
};

export default PrivateRoute;
