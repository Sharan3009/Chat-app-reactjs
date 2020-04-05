export const ROOM_NAME_INPUT = "ROOM_NAME_INPUT";

export function roomNameInput(payload){
    return {
        type: ROOM_NAME_INPUT,
        payload
    }
}