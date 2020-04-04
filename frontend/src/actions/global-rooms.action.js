import axios from 'axios';

export const GLOBAL_ROOMS_DATA = "GLOBAL_ROOMS_DATA";
export const GLOBAL_ROOMS_DATA_STATUS = "GLOBAL_ROOMS_DATA_STATUS";
export const RESET_ROOMS_DATA_OBJ = "RESET_ROOMS_DATA_OBJ";
export const START_ADD_ROOM = "START_ADD_ROOM";

export function globalRoomsApi(){
    return axios.get(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}rooms/all`,
        { withCredentials:true }
    )
}

export function setRoomsData(payload){
    return {
        type: GLOBAL_ROOMS_DATA,
        payload
    }
}

export function setRoomsDataStatus(payload){
    return {
        type: GLOBAL_ROOMS_DATA_STATUS,
        payload
    }
}

export function addGlobalRoom(payload){
    return {
        type: START_ADD_ROOM,
        payload
    }
}

export function resetGlobalRoomsDataObj(){
    return {
        type: RESET_ROOMS_DATA_OBJ
    }
}