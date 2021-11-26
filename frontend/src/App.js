import React from 'react';
import {Switch, HashRouter, Route, Redirect} from "react-router-dom";
import { Provider } from 'react-redux';
import './App.scss';
import Login from "./components/login";
import SignUp from "./components/signup";
import Home from './components/home/home';
import store from './store';
import ProtectedRoute from './components/protected-route';
import AuthenticatedRedirectRoute from './components/authenticated-redirect-route';
class App extends React.Component {

  render(){
    return(
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <AuthenticatedRedirectRoute exact path="/signup" component={SignUp} />
            <AuthenticatedRedirectRoute exact path="/login" component={Login} />
            <ProtectedRoute path="/rooms" component={Home} />
            <Route path="/">
              <Redirect to="/login"></Redirect>
            </Route>
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

export default App;