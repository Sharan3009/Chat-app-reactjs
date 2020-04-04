import axios from 'axios';

export const SELF_ROOMS_DATA = "SELFS_ROOM_DATA";
export const SELF_ROOMS_DATA_STATUS = "SELFS_ROOM_DATA_STATUS";
export const START_ADD_ROOM = "START_ADD_ROOM";
export const STOP_ADD_ROOM = "STOP_ADD_ROOM";
export const ROOM_NAME_INPUT = "ROOM_NAME_INPUT";

export function selfRoomsApi(){
    return axios.get(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}rooms/self`,
        { withCredentials:true }
    )
}

export function setRoomsData(payload){
    return {
        type: SELF_ROOMS_DATA,
        payload
    }
}

export function setRoomsDataStatus(payload){
    return {
        type: SELF_ROOMS_DATA_STATUS,
        payload
    }
}

export function addSelfRoom(payload){
    return {
        type: START_ADD_ROOM,
        payload
    }
}

export function roomNameInput(payload){
    return {
        type: ROOM_NAME_INPUT,
        payload
    }
}

export function deleteSelfRoom(payload){
    return {
        type: STOP_ADD_ROOM,
        payload
    }
}