import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { childRouteParam } from '../../higher-order-components/child-route-param';
import ChatInputBox from '../chat-input-box';
import { Spinner } from 'react-bootstrap';
import { getRoomChatsApi, setRoomDataStatus,
    setRoomData, setInitialProps, addChatToChatRoom,
    updateChatInChatRoom } from '../../actions/chat-room.action';
import ChatPlank from '../chat-plank';
import style from './chat-room.module.scss';
import { socketOn, socketEmit } from '../../actions/socket.action';
import { userDetails } from '../../higher-order-components/user';

class ChatRoom extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.joinRoom();
        this.getChats();
        this.onSocketReceiveMessage();
    }

    componentWillUnmount(){
        this.leaveRoom(this.props.match.params.roomId);
    }

    onSocketReceiveMessage=()=>{
        this.props.dispatch(
            socketOn('receive-message',(data)=>{
                this.props.dispatch(updateChatInChatRoom(data));
            })
        )
    }

    addNewChat=(data)=>{
        this.props.dispatch(addChatToChatRoom(data));
    }

    componentDidUpdate(prevProps,prevStates,segment){
        if(prevProps.match.params.roomId!==this.props.match.params.roomId){
            this.getChats();
            this.leaveRoom(prevProps.match.params.roomId);
        }
        return null;
    }

    joinRoom = () =>{
        this.props.dispatch(socketOn('start-room',()=>{
            const roomId = this.props.match.params.roomId;
            const { userId, userName } = this.props.currentUser;
            this.props.dispatch(socketEmit('join-room',{roomId,userId,userName}));
        }))
    }

    leaveRoom = (roomId) =>{
        const { userId, userName } = this.props.currentUser;
        this.props.dispatch(socketEmit('leave-room',{roomId,userId,userName}));
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
                    <div className="parent-flex px-2 pb-2">
                        <div className="child-flex position-relative">
                            <div className={style.shiftToEnd}>
                                {chatRoomData.filter(chat=>chat.chatId || chat.ack).map((chat)=><ChatPlank key={chat.chatId || chat.ack} chat={chat}/>)}
                            </div>
                        </div>
                        <ChatInputBox addNewChat={this.addNewChat}/>
                    </div>
                )
            } else {
                return (
                    <>
                        {this.renderErrorElement("No conversation has been started.")}
                        <ChatInputBox addNewChat={this.addNewChat}/>
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
    childRouteParam,
    userDetails
)(ChatRoom)