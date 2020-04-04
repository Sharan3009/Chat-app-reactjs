import React from 'react';
import { FormControl, Modal } from 'react-bootstrap';
class SelfRoomPlank extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.inputRef.focus();
    }

    renderHeaderEle(editable){
        if(editable){
            return(
                <>
                    <Modal.Header closeButton className="px-0 pb-2 pt-0" onHide={(e)=>this.props.deleteRoom(this.props.room)}>
                        <Modal.Title className="p-0 h5">Create room</Modal.Title>
                    </Modal.Header>
                    <FormControl ref={(ref)=>this.inputRef=ref} type="text" placeholder="Enter Room Name"/>
                </>
            )
        } else {
            const {room} = this.props;
            return (
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-0 text-ellipsis line-height-1.5" title={room.name}>
                        {room.name}
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
            <a href="#" className="list-group-item list-group-item-action
                flex-column align-items-start rounded-0" onClick={this.onRoomClick}>
                {this.renderHeaderEle(room.editable)}
                <p className="mb-0">
                    Owner: {(currentUser.userId===room.ownerId)?'You':room.ownerName}
                </p>
                <small>Joined: {room.joinees?.length || 0}/{room.capacity || 0}</small>
            </a>
        )
    }
}

export default SelfRoomPlank;