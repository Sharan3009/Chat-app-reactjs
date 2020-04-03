import { SEND } from '../actions/socket.action';

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