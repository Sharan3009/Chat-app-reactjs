import axios from 'axios';

export const SET_INITIAL_PROPS = "SET_INITIAL_PROPS";
export const CHAT_ROOM_DATA = "CHAT_ROOM_DATA";
export const CHAT_ROOM_DATA_STATUS = "CHAT_ROOM_DATA_STATUS";
export const ADD_CHAT = "ADD_CHAT";
export const RESET_ROOMS_DATA_OBJ = "RESET_CHAT_ROOM_DATA_OBJ";
export const UPDATE_CHAT = "UPDATE_CHAT";

export function getRoomChatsApi(roomId){
    return axios.get(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}chats/${roomId}`,
        { withCredentials:true }
    )
}

export function setRoomData(payload){
    return {
        type: CHAT_ROOM_DATA,
        payload
    }
}

export function setRoomDataStatus(payload){
    return {
        type: CHAT_ROOM_DATA_STATUS,
        payload
    }
}

export function addChatToChatRoom(payload){
    return {
        type: ADD_CHAT,
        payload
    }
}

export function updateChatInChatRoom(payload){
    return {
        type: UPDATE_CHAT,
        payload
    }
}

export function setInitialProps(){
    return {
        type: SET_INITIAL_PROPS
    }
}