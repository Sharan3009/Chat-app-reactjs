import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import Auth from '../../classes/Auth';

const AuthenticatedRedirectRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={(props) =>
      Auth.isAuthenticated() ? <Redirect to={{pathname: "/rooms"}}/>:<Component {...props} />
    }
  />
);

export default AuthenticatedRedirectRoute