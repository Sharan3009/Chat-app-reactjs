import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { selfRoomsApi, setRoomsDataStatus, setRoomsData, stopAddRoom } from '../../actions/side-component.action';
import style from './side-component.module.scss';
import { withRouter } from 'react-router-dom'; 
import { Spinner } from 'react-bootstrap';
import SelfRoomPlank from '../self-room-plank';
import { getUserDetailsFromStorage } from '../../utils';

class Side extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.getSelfRooms();
    }

    getSelfRooms(){
        this.props.dispatch(setRoomsDataStatus("loading"))
        selfRoomsApi()
        .then(
        (apiResponse)=>{
            if(apiResponse.data){
                if(apiResponse.data.status===401){
                    localStorage.clear();
                    this.props.history.push("/login");
                } else {
                    this.props.dispatch(setRoomsData(apiResponse.data.data));
                }
            }
        })
        .catch(
        (apiError)=>{
            let message = "";
            if(apiError.data){
              message=apiError.data.message;
            }
            this.props.dispatch(setRoomsDataStatus("error"))
        });
    }

    renderErrorElement(ele){
        return (
            <div className="m-auto">
                {ele}
            </div>
        )
    }

    onDeleteRoom = (room) =>{
        const { selfRoomsData } = this.props;
        let index = selfRoomsData.findIndex((r)=>r.roomId===room.roomId);
        if(~index){
            selfRoomsData.splice(index,1);
            this.props.dispatch(stopAddRoom(selfRoomsData))
        }
    }

    renderElement(){
        const { selfRoomsData, selfRoomsDataStatus } = this.props;
        if(selfRoomsData){
            if(selfRoomsData.length){
                return (
                <div className="list-group child-flex">
                    {this.props.selfRoomsData.filter((room)=>room.roomId).map((room)=> <SelfRoomPlank key={room.roomId} room={room} currentUser={getUserDetailsFromStorage()} deleteRoom={(room)=>this.onDeleteRoom(room)}/>)}
                </div>
                )
            } else {
                return this.renderErrorElement("You have not joined or created any room");
            }
        } else {
            if(selfRoomsDataStatus==='loading'){
                return this.renderErrorElement(<Spinner animation="grow"/>)
            } else if(selfRoomsDataStatus==='error'){
                return this.renderErrorElement(process.env.REACT_APP_DEFAULT_ERROR_MESSAGE);
            }
        }
    }

    render(){
        return(
            <div className="parent-flex" id="side">
                { this.renderElement() }
            </div>
        )
    }
}

const mapStateToProps = ({sideComponent}) => {
    return sideComponent;
  }
  
export default compose(
    connect(mapStateToProps),
    withRouter
)(Side)