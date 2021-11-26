export const CHAT_INPUT_TEXT = "CHAT_INPUT_TEXT";

export function chatInput(payload){
    return {
        type: CHAT_INPUT_TEXT,
        payload
    }
}