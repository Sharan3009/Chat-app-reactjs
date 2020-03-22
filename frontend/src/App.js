import React from 'react';
import {BrowserRouter as Router, Switch, HashRouter, Link, Route,} from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show:false
    }
  }
  
  setShow(bool){
    this.setState({show:bool});
  }

  handleClose(){
    this.setShow(false);
  }

  handleShow(){
    this.setShow(true);
  }

  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/" render={Login}>
          </Route>
          <Route path="/signup" render={SignUp}>
          </Route>
          <Route path="/login" render={Login}>
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;