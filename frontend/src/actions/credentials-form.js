import axios from "axios";
export const AFTER_SUBMIT = "AFTER_SUBMIT";
export const FORM_HANDLER = "FORM_HANDLER";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

export function setFormData(name,value){
    return function(dispatch){
        let action = {
            type:FORM_HANDLER,
            payload:{name,value}
        }
        dispatch(action);
        return Promise.resolve();
    }
}

export function afterFormSubmit(show,message,variant){
    return{
        type: AFTER_SUBMIT,
        payload:{
            show,
            message,
            variant
        }
    }
}

export function loginApi(email,password){
    return axios.post(
        `${process.env.REACT_APP_DOMAIN || ""}/api/v1/users/login`,
        {
            email,
            password
        }
    )
}

export function signUpApi(firstName,lastName,email,password){
    return axios.post(
        `${process.env.REACT_APP_DOMAIN || ""}/api/v1/users/signup`,
        {
            firstName,
            lastName,
            email,
            password
        }
    )
}