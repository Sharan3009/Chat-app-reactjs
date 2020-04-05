import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { socketEmit } from '../../actions/socket.action';
import { roomNameInput } from '../../actions/room-name-input.action';
import { FormControl } from 'react-bootstrap';

class RoomNameInput extends React.Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount(){
        this.textInput.current.focus();
        this.props.dispatch(roomNameInput(""));
    }

    handleRoomNameOnChange=(e)=>{
        this.props.dispatch(roomNameInput(e.target.value));
    }

    keyDownRoomNameInput=(event)=>{
        if(event.keyCode===13){
            this.createRoom();
        }
    }

    createRoom=()=>{
        let roomName = this.props.roomName;
        if(roomName){
            roomName = roomName.slice(0,this.props.maxRoomLengthName)
            let data = {
                roomName
            }
            this.props.dispatch(socketEmit("create-room",data))
        }
    }

    render(){
        return(
            <FormControl ref={this.textInput}
             value={this.props.roomName}
             onChange={this.handleRoomNameOnChange}
             type="text" 
             placeholder="Enter Room Name" 
             onKeyDown={this.keyDownRoomNameInput} 
             maxLength={this.props.maxRoomLengthName}/>
        )
    }
}

const mapPropsToState = ({roomNameInput}) =>{
    return roomNameInput
}

export default compose(
    connect(mapPropsToState)
)(RoomNameInput)