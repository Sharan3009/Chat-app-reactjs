import React from 'react';
import {Switch, HashRouter, Route, Redirect} from "react-router-dom";
import { Provider } from 'react-redux';
import './App.scss';
import Login from "./components/login";
import SignUp from "./components/signup";
import Home from './components/home/home';
import store from './store';

class App extends React.Component {

  render(){
    return(
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path="/signup" component={SignUp}>
            </Route>
            <Route path="/login" component={Login}>
            </Route>
            <Route path="/home" component={Home}>
            </Route>
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