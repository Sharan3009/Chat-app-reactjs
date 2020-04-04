import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import style from './main-component.module.scss'
import GlobalRooms from '../global-rooms/global-rooms';
import { Route, withRouter } from "react-router-dom";

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div id="main" className="parent-flex">
                <Route path={`${this.props.match.url}`} component={GlobalRooms} />
            </div>
        )
    }
}

const mapStateToProps = ({mainComponent}) => {
    return mainComponent
  }
  
export default compose(
    connect(mapStateToProps),
    withRouter
)(Main)