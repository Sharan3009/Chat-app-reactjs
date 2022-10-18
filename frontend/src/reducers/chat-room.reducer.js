import { CHAT_ROOM_DATA, CHAT_ROOM_DATA_STATUS,
      RESET_ROOMS_DATA_OBJ,
     SET_INITIAL_PROPS, UPDATE_CHAT
    }
from '../actions/chat-room.action'; 

const initialState = {
    chatRoomDataStatus : "loading",
    chatRoomData: null,
}

function reducer(state=initialState,action){
    switch(action.type){
        case CHAT_ROOM_DATA:{
            return {
              ...state,
              chatRoomData: action.payload
            };
          }
      
        case CHAT_ROOM_DATA_STATUS:
            return {...state, chatRoomDataStatus:action.payload};

        case UPDATE_CHAT:{
            let index = state.chatRoomData.findIndex((x)=>x.chatId == action.payload.chatId);
            if(index==-1)
              return {
                ...state,
                chatRoomData: state.chatRoomData.concat(action.payload)
              }
          }
        
        case SET_INITIAL_PROPS:
          return {
            ...initialState
          }
        
        default:
          return state;
    }
}

export default reducer;