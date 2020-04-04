import React from 'react';
import { FormControl } from 'react-bootstrap';

class SelfRoomPlank extends React.Component {
    constructor(props){
        super(props)
    }

    renderHeaderEle(editable){
        if(editable){
            return(
                <FormControl type="text" placeholder="Enter Room Name" />
            )
        } else {
            const {room} = this.props;
            return (
                <h5 className="mb-0 text-ellipsis line-height-1.5" title={room.name}>
                    {room.name}
                </h5>
            )
        }
    }

    render(){
        const { room } = this.props;
        return(
            <a href="#" className="list-group-item list-group-item-action
                flex-column align-items-start rounded-0">
                <div className="d-flex w-100 justify-content-between">
                    {this.renderHeaderEle(room.editable)}
                </div>
                <p className="mb-0">
                    Owner: {room.ownerName}
                </p>
                <small>Joined: {room.joinees?.length || 0}/{room.capacity || 0}</small>
            </a>
        )
    }
}

export default SelfRoomPlank;