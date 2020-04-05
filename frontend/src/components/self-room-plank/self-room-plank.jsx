import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import RoomNameInput from '../room-name-input';
import { randomRGB } from '../../utils';

class SelfRoomPlank extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            maxRoomLengthName : 50,
            backgroundColor: null
        }
    }

    componentDidMount(){
        this.onSocketCreateRoom();
        this.setBgColor();
    }

    setBgColor(){
        if(this.props.applyColorScheme){
            this.setState({backgroundColor:randomRGB()})
        }
    }

    onSocketCreateRoom=(cb)=>{
        const {room} = this.props;
        this.props.onSocketCreateRoom(()=>{
            if(room && room.editable){
                this.props.deleteRoom(room);
                if(cb){
                    cb(room)
                }
            }
        })
    }

    renderHeaderEle(editable){
        if(editable){
            return(
                <>
                    <Modal.Header closeButton className="px-0 pb-2 pt-0" onHide={(e)=>this.props.deleteRoom(this.props.room)}>
                        <Modal.Title className="p-0 h5">Create room</Modal.Title>
                    </Modal.Header>
                    <RoomNameInput maxRoomLengthName={this.state.maxRoomLengthName}
                    onSocketCreateRoom={this.onSocketCreateRoom} />
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
                flex-column align-items-start ${this.props.className}`} onClick={this.onRoomClick} style={{backgroundColor:this.state.backgroundColor}}>
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