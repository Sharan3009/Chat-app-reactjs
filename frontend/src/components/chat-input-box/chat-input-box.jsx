import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, FormControl} from 'react-bootstrap';
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
        if(chatInputText){
            let data = {
                message: chatInputText,
            }
            this.props.dispatch(chatInput(""));
            this.props.dispatch(socketEmit("room-chat-msg",data))
        }
    }

    render(){
        return(
            <div className="d-flex w-100">
                <FormControl ref={this.textInput}
                value={this.props.chatInputText}
                onChange={this.onChatInputChange}
                type="text" 
                placeholder="Enter a message"
                className="form-control-lg mr-2" 
                onKeyDown={this.keyDownChatInput} />
                <Button variant="danger">End&nbsp;Chat</Button>
            </div>
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