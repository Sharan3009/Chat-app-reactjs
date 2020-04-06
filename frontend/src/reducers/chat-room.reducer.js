import { CHAT_ROOM_DATA, CHAT_ROOM_DATA_STATUS,
     ADD_CHAT, RESET_ROOMS_DATA_OBJ,
     SET_INITIAL_PROPS, UPDATE_CHAT
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
            let chats = state.chatRoomData || [];
            let obj = {
              chatRoomDataLength: state.chatRoomDataLength,
              chatRoomData: [action.payload]
            }
            obj = mapArrToObj(obj,state.chatRoomDataObj);
            return {
              ...state, 
              chatRoomData:[
                ...chats,
                ...obj.chatRoomData,
              ],
              chatRoomDataLength: obj.chatRoomDataLength
            }
          }
      
        case RESET_ROOMS_DATA_OBJ:
          return {
            ...state,
            chatRoomDataObj: {}
          }

        case UPDATE_CHAT:{
          const {ack,chatId,message} = action.payload;
          state.chatRoomDataObj[ack || chatId].message = message;
          return {
            ...state,
            chatRoomData: [
              ...state.chatRoomData
            ]
          };
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
      referencedArr = chatRoomData.map((chat)=>{
        if (chat.ack && !(chat.ack in referencedObj)){
          chatRoomDataLength++;
          referencedObj[chat.ack] = chat;
          return chat;
        }else if(chat.chatId && !(chat.chatId in referencedObj)){
          chatRoomDataLength++;
          referencedObj[chat.chatId] = chat;
          return chat;
        }
        return {};
      })
      return { chatRoomDataLength, chatRoomData:referencedArr };
    }
    return obj;
  }

export default reducer;