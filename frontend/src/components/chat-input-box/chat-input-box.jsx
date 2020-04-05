import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormControl} from 'react-bootstrap';

class ChatInputBox extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <FormControl placeholder="Enter a message" className="m-2 w-auto" />
        )
    }
}

const mapStateToProps = ({chatInputBox})=>{
    return chatInputBox;
}

export default compose(
    connect(mapStateToProps)
)(ChatInputBox)