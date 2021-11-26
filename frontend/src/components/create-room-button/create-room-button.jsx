import React from 'react';
import { Button } from 'react-bootstrap';
import { addSelfRoom } from '../../actions/side-component.action';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { userDetails } from '../../higher-order-components/user';
import Room from '../../classes/Room';

class CreateRoomButton extends React.Component{
    constructor(props){
        super(props);
    }

    startCreateRoom=()=>{
        let currentUser = this.props.currentUser;
        let { selfRoomsData } = this.props;
        let { userId, userName } = currentUser;
        let roomId = "createRoom"
        let room = new Room("",userId,userName,[{userId,userName}],true,roomId);
        selfRoomsData = selfRoomsData || [];
        this.props.dispatch(addSelfRoom(room));
    }

    render(){
        return(
            <Button variant="success" size="sm" className={this.props.className} onClick={this.startCreateRoom}>Create room</Button>
        )
    }
}

const mapStateToProps = ({sideComponent}) => {
    return sideComponent;
  }
  
export default compose(
    connect(mapStateToProps),
    userDetails
)(CreateRoomButton)