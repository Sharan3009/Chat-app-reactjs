import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import { userDetails } from '../../higher-order-components/user';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={(props) =>
      rest.isAuthenticated() ? <Component {...props} />:<Redirect to={{pathname: "/"}}/>
    }
  />
);

export default userDetails(ProtectedRoute)