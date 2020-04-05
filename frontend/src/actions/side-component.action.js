import axios from 'axios';

export const SELF_ROOMS_DATA = "SELF_ROOMS_DATA";
export const SELF_ROOMS_DATA_STATUS = "SELF_ROOMS_DATA_STATUS";
export const START_ADD_ROOM = "START_SELF_ADD_ROOM";
export const STOP_ADD_ROOM = "STOP_SELF_ADD_ROOM";
export const RESET_ROOMS_DATA_OBJ = "RESET_SELF_ROOMS_DATA_OBJ";
export const CURRENT_ROOM_ID = "CURRENT_ROOM_ID";

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

export function deleteSelfRoom(payload){
    return {
        type: STOP_ADD_ROOM,
        payload
    }
}

export function resetSelfRoomsDataObj(){
    return {
        type: RESET_ROOMS_DATA_OBJ
    }
}

export function updateCurrentRoomId(roomId){
    return {
        type:CURRENT_ROOM_ID,
        payload:roomId
    }
}