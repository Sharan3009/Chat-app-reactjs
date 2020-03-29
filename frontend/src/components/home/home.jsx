import React from 'react';
import style from './home.module.scss';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <h1>Welcome to home</h1>
    )
  }
}

export default Home;