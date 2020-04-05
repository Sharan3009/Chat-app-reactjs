import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SelfRoomPlank from '../self-room-plank';
import { globalRoomsApi, setRoomsDataStatus,
    setRoomsData, resetGlobalRoomsDataObj,
    addGlobalRoom } from '../../actions/global-rooms.action';
import { socketOn } from '../../actions/socket.action';
import { withRouter } from 'react-router-dom'; 
import { Container,Row,Col,Spinner } from 'react-bootstrap';
import { getUserDetailsFromStorage,randomRGB } from '../../utils';

class GlobalRooms extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentUser: getUserDetailsFromStorage()
        }
    }

    componentDidMount(){
        this.props.dispatch(resetGlobalRoomsDataObj())
        this.getGlobalRooms();
        this.onSocketCreateRoom();
    }

    onSocketCreateRoom=(cb)=>{
        this.props.dispatch(
            socketOn(this.state.currentUser.userId,(data)=>{
                this.props.dispatch(addGlobalRoom(data));
                if(cb){
                    cb(data);
                }
            })
        )
    }

    getGlobalRooms(){
        this.props.dispatch(setRoomsDataStatus("loading"))
        globalRoomsApi()
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

    renderElement(){
        const { globalRoomsData, globalRoomsDataStatus, globalRoomsDataLength } = this.props;
        if(globalRoomsData){
            if(globalRoomsData && globalRoomsDataLength){
                return (
                <Container fluid>
                    <Row>
                        {globalRoomsData.filter((room)=>room.roomId).map((room)=>
                        <Col lg="4" md="3" sm="12" className="p-2" key={room.roomId}>
                            <SelfRoomPlank room={room} 
                            currentUser={this.state.currentUser} 
                            onSocketCreateRoom={this.onSocketCreateRoom}
                            className="rounded"
                            backgroundColor = {randomRGB()}/>
                        </Col>)}
                    </Row>
                </Container>
                )
            } else {
                return this.renderErrorElement("You have not joined or created any room");
            }
        } else {
            if(globalRoomsDataStatus==='loading'){
                return this.renderErrorElement(<Spinner animation="grow"/>)
            } else if(globalRoomsDataStatus==='error'){
                return this.renderErrorElement(process.env.REACT_APP_DEFAULT_ERROR_MESSAGE);
            }
        }
    }

    render(){
        return(
            <>
                { this.renderElement() }
            </>
            )
    }
}

const mapStateToProps = ({globalRooms}) => {
    return globalRooms;
  }
  
export default compose(
    connect(mapStateToProps),
    withRouter
)(GlobalRooms)