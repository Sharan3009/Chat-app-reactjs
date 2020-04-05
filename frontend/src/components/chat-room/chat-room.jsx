import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { childRouteParam } from '../../higher-order-components/child-route-param';
import ChatInputBox from '../chat-input-box';

class ChatRoom extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
                <div className="child-flex">

                </div>
                <ChatInputBox />
            </>
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