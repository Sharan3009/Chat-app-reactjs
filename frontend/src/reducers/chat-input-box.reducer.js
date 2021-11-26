import { CHAT_INPUT_TEXT } from '../actions/chat-input-box.action';

const initialState = {
    chatInputText : ""
};

function reducer(state=initialState,action){
    switch(action.type){
        case CHAT_INPUT_TEXT:
            return {
                ...state,
                chatInputText : action.payload
            }
        default:
            return state;
    }
}

export default reducer;