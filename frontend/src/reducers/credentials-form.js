import { FORM_VALID, AFTER_SUBMIT, FORM_HANDLER, FORM_FIELD_ERROR_HANDLER, FORM_FIELD_TOUCHED_HANDLER } from '../actions/credentials-form';

const initialState = {
  firstName: "",
  lastName: "",
  confirmPassword: "",
  email: "",
  password: "",
  rememberMe: false,
  formValid: false,
  afterSubmit: {
    show: false,
    variant: "",
    message: ""
  },
  formErrors: {
    firstName:"",
    email:"",
    password:"",
    confirmPassword:{
      status:"",
      text:""
    }
  },
  formTouched:{
    firstName:false,
    email:false,
    password:false,
    confirmPassword:false
  }
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case FORM_VALID:
      return {
        ...state,
        formValid:action.payload
      }
    case AFTER_SUBMIT:
      return {
        ...state,
        afterSubmit:{
          ...action.payload,
          message:action.payload.message || "Something went wrong"
        }
      }
    case FORM_HANDLER:
      return {
        ...state,
        [action.payload.name]:action.payload.value
      };
    case FORM_FIELD_ERROR_HANDLER:
      return {
        ...state,
        formErrors:{
          ...action.payload
        }
      }
    case FORM_FIELD_TOUCHED_HANDLER:
      return{
        ...state,
        formTouched:{
          ...action.payload
        }
      }
    default:
      return state;
    }
  }

export default reducer;