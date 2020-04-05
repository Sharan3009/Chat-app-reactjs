import React from 'react';
import { FormControl, Modal } from 'react-bootstrap';
import { socketEmit } from '../../actions/socket.action';
import { roomNameInput } from '../../actions/side-component.action';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';

class SelfRoomPlank extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            maxRoomLengthName : 50
        }
    }

    componentDidMount(){
        if(this.inputRef){
            this.inputRef.focus();
        }
        this.onSocketCreateRoom();
    }

    onSocketCreateRoom(){
        const {room} = this.props;
        this.props.onSocketCreateRoom(()=>{
            if(room && room.editable){
                this.props.dispatch(roomNameInput(""));
                this.props.deleteRoom(room);
            }
        })
    }

    keyDownRoomNameInput=(event)=>{
        if(event.keyCode===13){
            this.createRoom();
        }
    }

    createRoom=()=>{
        let roomName = this.props.roomName;
        if(roomName){
            roomName = roomName.slice(0,this.state.maxRoomLengthName)
            let data = {
                roomName
            }
            this.props.dispatch(socketEmit("create-room",data))
        }
    }

    handleRoomNameOnChange=(e)=>{
        this.props.dispatch(roomNameInput(e.target.value));
    }

    renderHeaderEle(editable){
        if(editable){
            return(
                <>
                    <Modal.Header closeButton className="px-0 pb-2 pt-0" onHide={(e)=>this.props.deleteRoom(this.props.room)}>
                        <Modal.Title className="p-0 h5">Create room</Modal.Title>
                    </Modal.Header>
                    <FormControl ref={(ref)=>this.inputRef=ref} value={this.props.roomName} onChange={this.handleRoomNameOnChange} type="text" placeholder="Enter Room Name" onKeyDown={this.keyDownRoomNameInput} maxLength={this.state.maxRoomLengthName}/>
                </>
            )
        } else {
            const {room} = this.props;
            return (
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-0 text-ellipsis line-height-1.5" title={room.roomName}>
                        {room.roomName}
                    </h5>
                </div>
            )
        }
    }

    onRoomClick = (event) =>{
        if(this.props.room.editable){
            event.preventDefault();
        }
    }
    
    render(){
        const { room, currentUser } = this.props;
        return(
            <Link to={`${this.props.match.url}/${room.roomId}`} className={`list-group-item list-group-item-action
                flex-column align-items-start ${this.props.className}`} onClick={this.onRoomClick} style={{backgroundColor:this.props.backgroundColor}}>
                {this.renderHeaderEle(room.editable)}
                <p className="mb-0">
                    Owner: {(currentUser.userId===room.ownerId)?'You':room.ownerName}
                </p>
                <small>Joined: {room.joinees?.length || 0}/{room.capacity || 0}</small>
            </Link>
        )
    }
}



const mapStateToProps = ({sideComponent}) => {
    return sideComponent;
}
  
export default compose(
    connect(mapStateToProps),
    withRouter
)(SelfRoomPlank)