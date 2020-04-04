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
        let { userId } = currentUser;
        let userName = getFullName(currentUser);
        let room = new Room("",userId,userName,[{userId,userName}],true,"createRoom");
        this.props.dispatch(startAddRoom(room));
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