import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { childRouteParam } from '../../higher-order-components/child-route-param';
import ChatInputBox from '../chat-input-box';
import { Spinner } from 'react-bootstrap';
import { getRoomChatsApi, setRoomDataStatus,
    setRoomData, setInitialProps,
    updateChatInChatRoom } from '../../actions/chat-room.action';
import ChatPlank from '../chat-plank';
import style from './chat-room.module.scss';
import { socketOn, socketEmit } from '../../actions/socket.action';
import { userDetails } from '../../higher-order-components/user';

class ChatRoom extends React.Component{
    constructor(props){
        super(props);
        this.scrollComponent = React.createRef();
    }

    componentDidMount(){
        this.getRoom();
        this.onSocketDisconnect();
    }

    onSocketDisconnect = () =>{
        this.props.dispatch(socketOn("invalid-authtoken",()=>{
            localStorage.clear();
            this.props.history.push("/auth");
        }))
    }

    getRoom(){
        const { userId, userName } = this.props.currentUser;
        this.props.dispatch(socketOn(userId,(f)=>{
            if(f==="room_created"){
                this.getChats();
                this.onSocketReceiveMessage();
            }
        }))
    }

    onSocketReceiveMessage=()=>{
        this.props.dispatch(
            socketOn('receive-message',(data)=>{
                this.props.dispatch(updateChatInChatRoom(data));
                this.scrollToEnd();
            })
        )
    }

    scrollToEnd = () => {
        this.scrollComponent.current.scrollTo(0,this.scrollComponent.current.scrollHeight);
    }

    getChats(){
        this.props.dispatch(setInitialProps())
        this.props.dispatch(setRoomDataStatus("loading"))
        getRoomChatsApi()
        .then(
        (apiResponse)=>{
            if(apiResponse.data){
                if(apiResponse.data.status===401){
                    localStorage.clear();
                    this.props.history.push("/auth");
                } else {
                    this.props.dispatch(setRoomData(apiResponse.data.data));
                    this.scrollToEnd();
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
        const { chatRoomData, chatRoomDataStatus } = this.props;
        if(chatRoomData){
            if(chatRoomData && chatRoomData.length){
                return (
                    <div className="parent-flex px-2 pb-2">
                        <div className="child-flex position-relative">
                            <div className={style.shiftToEnd} ref={this.scrollComponent}>
                                {chatRoomData.sort((a,b)=>new Date(a.createdOn) - new Date(b.createdOn)).map((chat)=><ChatPlank key={chat.chatId} chat={chat}/>)}
                            </div>
                        </div>
                        <ChatInputBox/>
                    </div>
                )
            } else {
                return (
                    <div className="parent-flex px-2 pb-2">
                        {this.renderErrorElement("No conversation has been started.")}
                        <ChatInputBox/>
                    </div>
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