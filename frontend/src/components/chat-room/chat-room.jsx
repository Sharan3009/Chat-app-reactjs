import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { childRouteParam } from '../../higher-order-components/child-route-param';

class ChatRoom extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div>Room {this.props.match.params.roomId}</div>
        )
    }
}

const mapStateToProps = ({chatRoom}) => {
    return chatRoom;
}

export default compose(
    connect(mapStateToProps),
    withRouter,
    childRouteParam
)(ChatRoom)