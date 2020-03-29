import React from 'react';
import style from './home.module.scss';
import Side from '../side-component/side-component';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <Side />
    )
  }
}

export default Home;