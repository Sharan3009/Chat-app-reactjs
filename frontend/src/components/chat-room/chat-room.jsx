import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { childRouteParam } from '../../higher-order-components/child-route-param';
import ChatInputBox from '../chat-input-box';
import { Spinner } from 'react-bootstrap';
import { getRoomChatsApi, setRoomDataStatus, setRoomData, setInitialProps } from '../../actions/chat-room.action';

class ChatRoom extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.getChats()
    }

    componentDidUpdate(prevProps,prevStates,segment){
        if(prevProps.match.params.roomId!==this.props.match.params.roomId){
            this.getChats()
        }
        return null;
    }

    getChats(){
        this.props.dispatch(setInitialProps())
        let roomId = this.props.match.params.roomId;
        this.props.dispatch(setRoomDataStatus("loading"))
        getRoomChatsApi(roomId)
        .then(
        (apiResponse)=>{
            if(apiResponse.data){
                if(apiResponse.data.status===401){
                    localStorage.clear();
                    this.props.history.push("/login");
                } else {
                    this.props.dispatch(setRoomData(apiResponse.data.data));
                }
            }
        })
        .catch(
        (apiError)=>{
            let message = "";
            if(apiError.data){
              message=apiError.data.message;
            }
            this.props.dispatch(setRoomDataStatus("error"))
        });
    }

    renderErrorElement(ele){
        return (
            <div className="m-auto">
                {ele}
            </div>
        )
    }

    render(){
        const { chatRoomData, chatRoomDataStatus, chatRoomDataLength } = this.props;
        if(chatRoomData){
            if(chatRoomData && chatRoomDataLength){
                return (
                    <>
                        <div className="child-flex">

                        </div>
                    </>
                )
            } else {
                return (
                    <>
                        {this.renderErrorElement("No conversation has been started.")}
                        <ChatInputBox />
                    </>
                    )
            }
        } else {
            if(chatRoomDataStatus==='loading'){
                return this.renderErrorElement(<Spinner animation="grow"/>)
            } else if(chatRoomDataStatus==='error'){
                return this.renderErrorElement(process.env.REACT_APP_DEFAULT_ERROR_MESSAGE);
            }
        }
    }
}

const mapStateToProps = ({chatRoom}) => {
    return chatRoom;
}

export default compose(
    connect(mapStateToProps),
    withRouter,
    childRouteParam
)(ChatRoom)