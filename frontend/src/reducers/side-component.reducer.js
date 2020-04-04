import { SELF_ROOMS_DATA, SELF_ROOMS_DATA_STATUS, START_ADD_ROOM, STOP_ADD_ROOM } from '../actions/side-component.action'; 

const initialState = {
  selfRoomsDataStatus : "loading",
  selfRoomsData: null
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case SELF_ROOMS_DATA:
      return {...state, selfRoomsData:action.payload};
    case SELF_ROOMS_DATA_STATUS:
      return {...state, selfRoomsDataStatus:action.payload};
    case START_ADD_ROOM:
      let rooms = state.selfRoomsData || [];
      return {...state, selfRoomsData:[action.payload,...rooms] }
    case STOP_ADD_ROOM:
      return {...state, selfRoomsData:[...action.payload] }
    default:
      return state;
  }
}

 export default reducer;