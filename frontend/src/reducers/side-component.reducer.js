import { SELF_ROOMS_DATA, SELF_ROOMS_DATA_STATUS, START_ADD_ROOM, STOP_ADD_ROOM } from '../actions/side-component.action'; 

const selfRoomsDataObj = {};

const initialState = {
  selfRoomsDataStatus : "loading",
  selfRoomsData: null,
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case SELF_ROOMS_DATA:
      return {
        ...state,
        selfRoomsData:mapArrToObj(action.payload)
      };
    case SELF_ROOMS_DATA_STATUS:
      return {...state, selfRoomsDataStatus:action.payload};
    case START_ADD_ROOM:
      let rooms = state.selfRoomsData || [];
      return {
        ...state, 
        selfRoomsData:[
          ...mapArrToObj([action.payload]),
          ...rooms
        ]
      }
    case STOP_ADD_ROOM:
      let keyName = "roomId"
      deleteObj(selfRoomsDataObj,action.payload[keyName],keyName)
      return {...state, selfRoomsData:[...state.selfRoomsData] }
    default:
      return state;
  }
}

function mapArrToObj(arr){
  let referencedArr = [];
  if(Array.isArray(arr)){
    referencedArr = arr.map((room)=>{
      if(!(room.roomId in selfRoomsDataObj)){
        selfRoomsDataObj[room.roomId] = room;
        return room;
      }
      return {};
    })
    return referencedArr;
  }
  return [];
}

function deleteObj(referencedObj,key,keyName){
  if(referencedObj && referencedObj[key]){
    referencedObj[key][keyName] = null;
    delete referencedObj[key];
  }
}

 export default reducer;