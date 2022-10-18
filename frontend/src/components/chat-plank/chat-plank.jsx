import React from 'react';
import style from './chat-plank.scoped.scss';
import { userDetails } from '../../higher-order-components/user';

class ChatPlank extends React.Component{
    constructor(props){
        super(props);
    }

    chatUI=()=>{
        const { chat,currentUser } = this.props;
        if(chat.senderId === currentUser.userId){
            return this.myChatUI(chat.senderName, chat.message);
        }
        return this.notMineChatUI(chat.senderName, chat.message);

    }

    notMineChatUI = (userName,message) => {
        return (
            <li>
                <div className="message-data align-left">
                <span className="message-data-name"><i className="fa fa-circle online"></i> <b>{userName}</b> (Helper)</span>
                </div>
                <div className="message my-message float-left">
                {message}
                </div>
            </li>
        )
    }

    myChatUI = (userName, message) => {
        return (
            <li className="clearfix">
                <div className="message-data align-right">
                <span className="message-data-name" ><b>{userName}</b> (You)</span> <i className="fa fa-circle me"></i>
                
                </div>
                <div className="message other-message float-right">
                {message}
                </div>
            </li>
        )
    }

    render(){
        const { chat } = this.props;
        return(
            <div className="chat">
                {this.chatUI()}
            </div>
        )
    }
}

export default userDetails(ChatPlank);