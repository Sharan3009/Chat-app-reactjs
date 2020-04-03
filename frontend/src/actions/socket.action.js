export const SEND = 'SEND';
export const SEND_SUCCESS = 'SEND_SUCCESS';
export const SEND_FAIL = 'SEND_FAIL';
const TYPE = {
  type : 'socket',
  types:[SEND, SEND_SUCCESS, SEND_FAIL]
}
export function socketConnect(){
  return {
    ...TYPE,
    promise: (socket)=>socket.connect()
  }
}

export function socketDisconnect(){
  return {
    ...TYPE,
    promise: (socket)=>socket.disconnect()
  }
}

export function socketOn(event,cb){
  return {
    ...TYPE,
    promise: (socket)=>socket.on(event,cb)
  }
}

export function socketEmit(event, data) {
    return {
      type: 'socket',
      types: [SEND, SEND_SUCCESS, SEND_FAIL],
      promise: (socket) => socket.emit(event, data),
    }
}