import React from 'react';
import { Button } from 'react-bootstrap';
import { startAddRoom } from '../../actions/side-component.action';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getUserDetailsFromStorage, getFullName } from '../../utils';
import Room from '../../classes/Room';

class CreateRoomButton extends React.Component{
    constructor(props){
        super(props);
    }

    startCreateRoom=()=>{
        let currentUser = getUserDetailsFromStorage();
        let { selfRoomsData } = this.props;
        let { userId } = currentUser;
        let userName = getFullName(currentUser);
        let roomId = "createRoom"
        let room = new Room("",userId,userName,[{userId,userName}],true,roomId);
        selfRoomsData = selfRoomsData || [];
        let index = selfRoomsData.findIndex((room)=>room.roomId===roomId);
        if(!~index){
            this.props.dispatch(startAddRoom(room));
        }
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
)(CreateRoomButton)