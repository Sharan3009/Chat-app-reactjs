import axios from 'axios';

export const GET_ROOM_CHATS = "GET_ROOM_CHATS";

export function getRoomChats(roomId){
    return axios.get(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}chats/${roomId}`,
        { withCredentials:true }
    )
}