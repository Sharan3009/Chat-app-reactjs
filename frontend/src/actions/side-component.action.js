import axios from 'axios';

export const SELF_ROOMS_DATA = "SELFS_ROOM_DATA";
export const SELF_ROOMS_DATA_STATUS = "SELFS_ROOM_DATA_STATUS";

export function selfRoomsApi(){
    return axios.get(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}rooms/self`,
        { withCredentials:true }
    )
}

export function setRoomsData(data){
    return {
        type: SELF_ROOMS_DATA,
        data
    }
}

export function setRoomsDataStatus(data){
    return {
        type: SELF_ROOMS_DATA_STATUS,
        data
    }
}