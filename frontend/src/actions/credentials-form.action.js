import axios from "axios";
import { getDataFromStorage } from "../higher-order-components/local-storage";
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

export function genearteOTP(email){
    return axios.post(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}users/otp`,
        {
            email
        }
    )
}

export function verifyOTP(userId, otp){
    return axios.post(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}users/verify`,
        {
            userId,
            otp
        },
        {withCredentials:true}

    )
}