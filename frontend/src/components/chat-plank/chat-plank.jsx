import React from 'react';
import style from './chat-plank.module.scss';
import { userDetails } from '../../higher-order-components/user';

class ChatPlank extends React.Component{
    constructor(props){
        super(props);
        this.state={
            plankClass:null
        };
    }

    componentDidMount(){
        this.getChatClass();
    }

    getChatClass=()=>{
        let plankClass = null;
        const { chat,currentUser } = this.props;
        if(chat.senderId === currentUser.userId){
            plankClass = style.senderBubble;
        } else {
            plankClass = style.receiverBubble;
        }
        this.setState({plankClass});
    }

    render(){
        const { chat } = this.props;
        return(
            <div className={`${this.state.plankClass} text-center`}>
                {chat.message}
            </div>
        )
    }
}

export default userDetails(ChatPlank);