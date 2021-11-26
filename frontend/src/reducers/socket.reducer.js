import { SEND } from '../actions/socket.action';
/*
Reducer is currently not in use.
Check comment 1 in socket.action.js for explanation
*/
function reducer(state = {}, action = {}) {
    switch(action.type) {
      case SEND: {
        return {
          ...state,
          isSending: true,
        };
      }
      default: {
        return state;
      }
    }
  }

export default reducer;