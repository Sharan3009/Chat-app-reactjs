import { ROOM_NAME_INPUT } from '../actions/room-name-input.action'; 
const initialState =  {
    roomName: ""
}

function reducer(state=initialState,action){
    switch(action.type){
        case ROOM_NAME_INPUT:
            return {...state, roomName: action.payload };
        
        default:
            return state;
    }
}

export default reducer;