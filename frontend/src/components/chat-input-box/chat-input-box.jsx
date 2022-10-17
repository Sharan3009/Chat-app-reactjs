import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormControl} from 'react-bootstrap';
import { chatInput } from '../../actions/chat-input-box.action';
import { socketEmit } from '../../actions/socket.action';
import { userDetails } from '../../higher-order-components/user';
import { withRouter } from 'react-router-dom';

class ChatInputBox extends React.Component{

    constructor(props){
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount(){
        this.textInput.current.focus();
        this.props.dispatch(chatInput(""));
    }

    onChatInputChange=(e)=>{
        this.props.dispatch(chatInput(e.target.value));
    }

    keyDownChatInput=(event)=>{
        if(event.keyCode===13){
            this.sendChat();
        }
    }

    sendChat=()=>{
        const { chatInputText } = this.props;
        const { userId, userName } = this.props.currentUser;
        let ack = `${userId}${Math.random()*new Date()}`;
        if(chatInputText){
            let data = {
                message: chatInputText,
                ack
            }
            this.props.dispatch(chatInput(""));
            this.props.addNewChat({...data,senderId: userId,
                senderName: userName,});
            this.props.dispatch(socketEmit("room-chat-msg",data))
        }
    }

    render(){
        return(
            <FormControl ref={this.textInput}
             value={this.props.chatInputText}
             onChange={this.onChatInputChange}
             type="text" 
             placeholder="Enter a message"
             className="w-auto" 
             onKeyDown={this.keyDownChatInput} />
        )
    }
}

const mapStateToProps = ({chatInputBox})=>{
    return chatInputBox;
}

export default compose(
    connect(mapStateToProps),
    userDetails,
    withRouter
)(ChatInputBox)