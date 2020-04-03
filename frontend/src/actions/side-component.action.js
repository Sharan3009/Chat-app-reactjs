import axios from 'axios';

export function selfRoomsApi(){
    return axios.get(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_API_VERSION}rooms/self`,
        {withCredentials:true}
    )
}