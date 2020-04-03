import axios from 'axios';

export const START_LOGOUT = 'START_LOGOUT';
export const STOP_LOGOUT = 'STOP_LOGOUT';

export function logoutApi(){
    return axios.post(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}users/logout`,
        {},
        {withCredentials:true}
    )
}

export function startLogout(){
    return{
        type: START_LOGOUT,
    }
}

export function stopLogout(){
    return {
        type: STOP_LOGOUT
    }
}