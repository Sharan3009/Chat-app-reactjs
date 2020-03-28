import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import Auth from '../../classes/Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={(props) =>
      Auth.isAuthenticated() ? <Component {...props} />:<Redirect to={{pathname: "/"}}/>
    }
  />
);

export default ProtectedRoute