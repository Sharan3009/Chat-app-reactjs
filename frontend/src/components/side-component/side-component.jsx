import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import style from './side-component.module.scss'

class Side extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <>
                <div className="parent-flex">
                    <div className="child-flex">
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = ({sideComponent}) => {
    return sideComponent
  }
  
export default compose(
    connect(mapStateToProps),
)(Side)