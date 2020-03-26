import { FORM_VALID,AFTER_SUBMIT,FORM_HANDLER } from '../actions/credentials-form';

const initialState = {
    email: "",
    password: "",
    rememberMe: false,
    formValid: false,
    afterSubmit: {
      show: false,
      variant: "",
      message: ""
    }
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case FORM_VALID:
      return {
        ...state,
        formValid:action.value
      }
    case AFTER_SUBMIT:
      return {
        ...state,
        afterSubmit:{
          show:action.value.show,
          variant:action.value.variant,
          message:action.value.message || "Something went wrong"
        }
      }
    case FORM_HANDLER:
      return {
        ...state,
        [action.value.name]:action.value.value
      };
    default:
      return state;
    }
  }

export default reducer;