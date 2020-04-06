import { CHAT_ROOM_DATA, CHAT_ROOM_DATA_STATUS,
     ADD_CHAT, RESET_ROOMS_DATA_OBJ,
     SET_INITIAL_PROPS
    }
from '../actions/chat-room.action'; 

const initialState = {
    chatRoomDataStatus : "loading",
    chatRoomData: null,
    chatRoomDataLength: 0,
    chatRoomDataObj: {},
}

function reducer(state=initialState,action){
    switch(action.type){
        case CHAT_ROOM_DATA:{
            const { chatRoomDataLength } = state;
            let obj = {
              chatRoomDataLength,
              chatRoomData: action.payload
            }
            obj = mapArrToObj(obj,state.chatRoomDataObj);
            return {
              ...state,
              ...obj
            };
          }
      
        case CHAT_ROOM_DATA_STATUS:
            return {...state, chatRoomDataStatus:action.payload};
      
        case ADD_CHAT:{
            let rooms = state.chatRoomData || [];
            let obj = {
              chatRoomDataLength: state.chatRoomDataLength,
              chatRoomData: [action.payload]
            }
            obj = mapArrToObj(obj,state.chatRoomDataObj);
            return {
              ...state, 
              chatRoomData:[
                ...obj.chatRoomData,
                ...rooms
              ],
              chatRoomDataLength: obj.chatRoomDataLength
            }
          }
      
        case RESET_ROOMS_DATA_OBJ:
          return {
            ...state,
            chatRoomDataObj: {}
          }
        
        case SET_INITIAL_PROPS:
          return {
            ...initialState
          }
        
        default:
          return state;
    }
}

function mapArrToObj(obj,referencedObj){
    let { chatRoomDataLength, chatRoomData } = obj;
    let referencedArr = [];
    if(Array.isArray(chatRoomData)){
      referencedArr = chatRoomData.map((room)=>{
        if(!(room.roomId in referencedObj)){
          chatRoomDataLength++;
          referencedObj[room.roomId] = room;
          return room;
        }
        return {};
      })
      return { chatRoomDataLength, chatRoomData:referencedArr };
    }
    return obj;
  }

export default reducer;