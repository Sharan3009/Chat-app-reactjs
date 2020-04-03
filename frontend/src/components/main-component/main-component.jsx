import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import style from './main-component.module.scss'

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div id="main" className="parent-flex"></div>
        )
    }
}

const mapStateToProps = ({mainComponent}) => {
    return mainComponent
  }
  
export default compose(
    connect(mapStateToProps),
)(Main)