import React from 'react';
import {Switch, HashRouter, Route, Redirect} from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/signup" component={SignUp}>
          </Route>
          <Route path="/login" component={Login}>
          </Route>
          <Route path="/">
            <Redirect to="/login"></Redirect>
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;