import { FORM_VALID } from '../actions/credentials-form';

const initialState = {
    formValid: false
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case FORM_VALID:
      return {...state,formValid:action.value}
    default:
      return state;
    }
  }

export default reducer;