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
        formValid:action.value
      }
    case AFTER_SUBMIT:
      return {
        ...state,
        afterSubmit:{
          ...action.value,
          message:action.value.message || "Something went wrong"
        }
      }
    case FORM_HANDLER:
      return {
        ...state,
        [action.value.name]:action.value.value
      };
    case FORM_FIELD_ERROR_HANDLER:
      return {
        ...state,
        formErrors:{
          ...action.value
        }
      }
    case FORM_FIELD_TOUCHED_HANDLER:
      return{
        ...state,
        formTouched:{
          ...action.value
        }
      }
    default:
      return state;
    }
  }

export default reducer;