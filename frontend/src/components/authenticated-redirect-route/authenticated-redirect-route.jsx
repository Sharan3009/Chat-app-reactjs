import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import { userDetails } from '../../higher-order-components/user';

const AuthenticatedRedirectRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={(props) =>
      rest.isAuthenticated() ? <Redirect to={{pathname: "/room"}}/>:<Component {...props} />
    }
  />
);

export default userDetails(AuthenticatedRedirectRoute)