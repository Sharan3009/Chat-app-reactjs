import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateCurrentRoomId } from '../actions/side-component.action';

export function childRouteParam(WrappedComponent){
    class ChildRouteParam extends React.Component{
        constructor(props){
            super(props);
        }

        componentDidMount(){
            this.updateRoomId()
        }

        componentDidUpdate(prevProps,prevStates,segment){
            if(prevProps.match.params.roomId!==this.props.match.params.roomId){
                this.updateRoomId()
            }
            return null;
        }

        updateRoomId=()=>{
            const roomId = this.props.match.params.roomId || "";
            this.props.dispatch(updateCurrentRoomId(roomId));
        }

        render(){
            return <WrappedComponent
            roomId={this.props.match.params.roomId}
            {...this.props} />;
        }
    }

    const matchPropsToState = ({sideComponent}) =>{
        return sideComponent;
    }

    return compose(
        connect(matchPropsToState),
        withRouter
    )(ChildRouteParam)
}