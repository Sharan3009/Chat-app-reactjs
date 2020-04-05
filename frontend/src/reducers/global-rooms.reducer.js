import {
    GLOBAL_ROOMS_DATA, GLOBAL_ROOMS_DATA_STATUS,
    RESET_ROOMS_DATA_OBJ, START_ADD_ROOM
}
from '../actions/global-rooms.action';

import { randomRGB } from '../utils';

const initialState = {
    globalRoomsDataStatus: "loading",
    globalRoomsData: null,
    globalRoomsDataLength: 0,
    // dont use this in component, it just for O1 performance and should be inside state because other wise object doesnt refresh
    globalRoomsDataObj: {}
};

function reducer(state = initialState, action) {
    switch (action.type) {

        case GLOBAL_ROOMS_DATA: {
            const { globalRoomsDataLength } = state;
            let obj = {
                globalRoomsDataLength,
                globalRoomsData: action.payload
            }
            obj = mapArrToObj(obj, state.globalRoomsDataObj);
            return {
                ...state,
                ...obj
            };
        }

            case START_ADD_ROOM:{
            let rooms = state.globalRoomsData || [];
            let obj = {
                globalRoomsDataLength: state.globalRoomsDataLength,
                globalRoomsData: [action.payload]
            }
            obj = mapArrToObj(obj,state.globalRoomsDataObj);
            return {
                ...state, 
                globalRoomsData:[
                ...obj.globalRoomsData,
                ...rooms
                ],
                globalRoomsDataLength: obj.globalRoomsDataLength
            }
        }

        case GLOBAL_ROOMS_DATA_STATUS:
            return { ...state, globalRoomsDataStatus: action.payload };

        case RESET_ROOMS_DATA_OBJ:
            return {
                ...state,
                globalRoomsDataObj: {}
            }

        default:
            return state;
    }
}

function mapArrToObj(obj, referencedObj) {
    let { globalRoomsDataLength, globalRoomsData } = obj;
    let referencedArr = [];
    if (Array.isArray(globalRoomsData)) {
        referencedArr = globalRoomsData.map((room) => {
            if (!(room.roomId in referencedObj)) {
                globalRoomsDataLength++;
                referencedObj[room.roomId] = room;
                return room;
            }
            return {};
        })
        return { globalRoomsDataLength, globalRoomsData: referencedArr };
    }
    return obj;
}

export default reducer;