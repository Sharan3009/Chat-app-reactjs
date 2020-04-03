import { SELF_ROOMS_DATA, SELF_ROOMS_DATA_STATUS } from '../actions/side-component.action'; 

const initialState = {
  selfRoomsDataStatus : "loading",
  selfRoomsData: null
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case SELF_ROOMS_DATA:
      return {...state,selfRoomsData:action.data};
    case SELF_ROOMS_DATA_STATUS:
      return {...state,selfRoomsDataStatus:action.data};
    default:
      return state;
  }
}

 export default reducer;