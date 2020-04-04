export const SEND = 'SEND';
export const SEND_SUCCESS = 'SEND_SUCCESS';
export const SEND_FAIL = 'SEND_FAIL';
const TYPE = {
  type : 'socket',
  /*
  Comment 1: 
  keeping this types as it is.
  It may be needed when backend changes are implemented and status of loader, sent data or received callback needs to be implemented.
  Otherwise these are not in use right now
  */
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
      ...TYPE,
      promise: (socket) => socket.emit(event, data),
    }
}