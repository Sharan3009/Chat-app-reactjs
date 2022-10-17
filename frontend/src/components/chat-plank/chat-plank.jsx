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
            <li class="clearfix">
                <div class="message-data align-right">
                <span class="message-data-name" ><b>{userName}</b> (You)</span> <i class="fa fa-circle me"></i>
                
                </div>
                <div class="message other-message float-right">
                {message}
                </div>
            </li>
        )
    }

    render(){
        const { chat } = this.props;
        console.log(chat);
        return(
            <div className="chat">
                {this.chatUI()}
            </div>
            // <div className={`${this.state.plankClass} text-center shadow`}>
            //     {chat.message}
            // </div>
        )
    }
}

export default userDetails(ChatPlank);