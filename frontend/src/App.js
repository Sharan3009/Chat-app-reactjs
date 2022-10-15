import React from 'react';
import {Switch, HashRouter, Route, Redirect} from "react-router-dom";
import { Provider } from 'react-redux';
import './App.scss';
import Auth from "./components/auth/auth";
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
            <AuthenticatedRedirectRoute exact path="/auth" component={Auth} />
            <ProtectedRoute path="/room" component={Home} />
            <Route path="/">
              <Redirect to="/auth"></Redirect>
            </Route>
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

export default App;