import React from 'react';

class ChatPlank extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { chat } = this.props;
        return(
            <div>{chat.message}</div>
        )
    }
}

export default ChatPlank;