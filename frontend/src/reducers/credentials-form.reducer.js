import { AFTER_SUBMIT, FORM_HANDLER} from '../actions/credentials-form.action';

const initialState = {
  firstName: "",
  lastName: "",
  confirmPassword: "",
  email: "",
  password: "",
  rememberMe: false,
  afterSubmit: {
    show: false,
    variant: "",
    message: ""
  },
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case AFTER_SUBMIT:
      return {
        ...state,
        afterSubmit:{
          ...action.payload,
          message:action.payload.message || process.env.REACT_APP_DEFAULT_ERROR_MESSAGE
        }
      }
    case FORM_HANDLER:
      return {
        ...state,
        [action.payload.name]:action.payload.value
      };
    default:
      return state;
    }
  }

export default reducer;