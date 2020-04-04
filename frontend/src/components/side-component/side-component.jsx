import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { selfRoomsApi, setRoomsDataStatus, setRoomsData, deleteSelfRoom, addSelfRoom } from '../../actions/side-component.action';
import style from './side-component.module.scss';
import { socketOn } from '../../actions/socket.action';
import { withRouter } from 'react-router-dom'; 
import { Spinner } from 'react-bootstrap';
import SelfRoomPlank from '../self-room-plank';
import { getUserDetailsFromStorage } from '../../utils';

class Side extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentUser: getUserDetailsFromStorage()
        }
    }

    componentDidMount(){
        this.getSelfRooms();
        this.onSocketCreateRoom();
    }

    onSocketCreateRoom=()=>{
        this.props.dispatch(
            socketOn(this.state.currentUser.userId,(data)=>{
                console.log(data)
                this.props.dispatch(addSelfRoom(data));
            })
        )
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
                    this.props.dispatch(setRoomsData(apiResponse.data.data.reverse()));
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
        this.props.dispatch(deleteSelfRoom(room))
    }

    renderElement(){
        const { selfRoomsData, selfRoomsDataStatus, selfRoomsDataLength } = this.props;
        if(selfRoomsData){
            if(selfRoomsData && selfRoomsDataLength){
                return (
                <div className="list-group child-flex">
                    {this.props.selfRoomsData.filter((room)=>room.roomId).map((room)=> <SelfRoomPlank key={room.roomId} room={room} currentUser={this.state.currentUser} deleteRoom={(room)=>this.onDeleteRoom(room)}/>)}
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