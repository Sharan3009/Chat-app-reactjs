import axios from 'axios';

export const SELF_ROOMS_DATA = "SELFS_ROOM_DATA";
export const SELF_ROOMS_DATA_STATUS = "SELFS_ROOM_DATA_STATUS";
export const START_ADD_ROOM = "START_ADD_ROOM";

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

export function startAddRoom(payload){
    return {
        type: START_ADD_ROOM,
        payload
    }
}