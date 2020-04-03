import { START_LOGOUT, STOP_LOGOUT } from '../actions/app-navbar.action';

const initialState = {
    logoutStatus : "stop"
}

function reducer(state=initialState,action){
    switch(action.type){
        case START_LOGOUT:
            return {
                ...state,
                logoutStatus: "start"
            }
        case STOP_LOGOUT:
            return {
                ...state,
                logoutStatus: "stop"
            }
        default:
            return state;
    }
}

export default reducer;