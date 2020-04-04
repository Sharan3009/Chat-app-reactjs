import { SELF_ROOMS_DATA, SELF_ROOMS_DATA_STATUS,
        START_ADD_ROOM, STOP_ADD_ROOM,
        ROOM_NAME_INPUT 
        }
from '../actions/side-component.action'; 

const selfRoomsDataObj = {};

const initialState = {
  selfRoomsDataStatus : "loading",
  selfRoomsData: null,
  selfRoomsDataLength: 0,
  roomName: ""
};

function reducer(state = initialState, action) {
  switch(action.type) {

    case SELF_ROOMS_DATA:{
      const { selfRoomsDataLength } = state;
      let obj = {
        selfRoomsDataLength,
        selfRoomsData: action.payload
      }
      obj = mapArrToObj(obj);
      return {
        ...state,
        ...obj
      };
    }

    case ROOM_NAME_INPUT:
      return {...state, roomName: action.payload };

    case SELF_ROOMS_DATA_STATUS:
      return {...state, selfRoomsDataStatus:action.payload};

    case START_ADD_ROOM:{
      let rooms = state.selfRoomsData || [];
      let obj = {
        selfRoomsDataLength: state.selfRoomsDataLength,
        selfRoomsData: [action.payload]
      }
      obj = mapArrToObj(obj);
      return {
        ...state, 
        selfRoomsData:[
          ...obj.selfRoomsData,
          ...rooms
        ],
        selfRoomsDataLength: obj.selfRoomsDataLength
      }
    }

    case STOP_ADD_ROOM:{
      let keyName = "roomId";
      let selfRoomsDataLength = deleteObj(state.selfRoomsDataLength,selfRoomsDataObj,action.payload[keyName],keyName)
      return {...state,
        selfRoomsData:[...state.selfRoomsData],
        selfRoomsDataLength
      }
    }

    default:
      return state;
  }
}

function mapArrToObj(obj){
  let { selfRoomsDataLength, selfRoomsData } = obj;
  let referencedArr = [];
  if(Array.isArray(selfRoomsData)){
    referencedArr = selfRoomsData.map((room)=>{
      if(!(room.roomId in selfRoomsDataObj)){
        selfRoomsDataLength++;
        selfRoomsDataObj[room.roomId] = room;
        return room;
      }
      return {};
    })
    return { selfRoomsDataLength, selfRoomsData:referencedArr };
  }
  return obj;
}

function deleteObj(roomLength, referencedObj,key,keyName){
  if(referencedObj && referencedObj[key]){
    referencedObj[key][keyName] = null;
    delete referencedObj[key];
    roomLength--
  }
  return roomLength;
}

 export default reducer;