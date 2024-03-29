import { SELF_ROOMS_DATA, SELF_ROOMS_DATA_STATUS,
        START_ADD_ROOM, STOP_ADD_ROOM,
        RESET_ROOMS_DATA_OBJ, CURRENT_ROOM_ID
        }
from '../actions/side-component.action'; 

const initialState = {
  selfRoomsDataStatus : "loading",
  selfRoomsData: null,
  selfRoomsDataLength: 0,
  // dont use this in component, it just for O1 performance and should be inside state because other wise object doesnt refresh
  selfRoomsDataObj: {},
  currentRoomId: ""
};

function reducer(state = initialState, action) {
  switch(action.type) {

    case SELF_ROOMS_DATA:{
      const { selfRoomsDataLength } = state;
      let obj = {
        selfRoomsDataLength,
        selfRoomsData: action.payload
      }
      obj = mapArrToObj(obj,state.selfRoomsDataObj);
      return {
        ...state,
        ...obj
      };
    }

    case SELF_ROOMS_DATA_STATUS:
      return {...state, selfRoomsDataStatus:action.payload};

    case START_ADD_ROOM:{
      let rooms = state.selfRoomsData || [];
      let obj = {
        selfRoomsDataLength: state.selfRoomsDataLength,
        selfRoomsData: [action.payload]
      }
      obj = mapArrToObj(obj,state.selfRoomsDataObj);
      return {
        ...state, 
        selfRoomsData:[
          ...obj.selfRoomsData,
          ...rooms
        ],
        selfRoomsDataLength: obj.selfRoomsDataLength
      }
    }

    case RESET_ROOMS_DATA_OBJ:
      return {
        ...state,
        selfRoomsDataObj: {}
      }

    case STOP_ADD_ROOM:{
      let keyName = "roomId";
      let selfRoomsDataLength = deleteObj(state.selfRoomsDataLength,state.selfRoomsDataObj,action.payload[keyName],keyName)
      return {...state,
        selfRoomsData:[...state.selfRoomsData],
        selfRoomsDataLength
      }
    }

    case CURRENT_ROOM_ID:
      return {
        ...state,
        currentRoomId:action.payload
      }

    default:
      return state;
  }
}

function mapArrToObj(obj,referencedObj){
  let { selfRoomsDataLength, selfRoomsData } = obj;
  let referencedArr = [];
  if(Array.isArray(selfRoomsData)){
    referencedArr = selfRoomsData.map((room)=>{
      if(!(room.roomId in referencedObj)){
        selfRoomsDataLength++;
        referencedObj[room.roomId] = room;
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