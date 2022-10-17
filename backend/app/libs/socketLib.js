const mongoose = require('mongoose')
const socketio = require('socket.io')
const events = require('events')
const cookie = require("cookie");
const eventEmitter = new events.EventEmitter()
const ChatModel = mongoose.model('Chat')
const RoomModel = mongoose.model('Room')
const shortid = require('shortid')
const redisLib = require('./redisLib');
const { verifyClaim } = require('./tokenLib');
const check = require("./checkLib")

let userRooms = [];
let helperRooms = [];

let setServer = (server) => {
    let io = socketio.listen(server)
    let myIo = io.of('')  //namespace

    /*--------estabilishing connection using service.ts---------------*/
    myIo.on('connection', (socket) => {
        const authToken = cookie.parse(socket.handshake.headers.cookie)["authToken"];
        verifyClaim(authToken,async (err,obj)=>{
            if(err)
                return;
            socket.userId = obj.data.userId;
            socket.userName = obj.data.userName;
            socket.helper = obj.data.helper;
            await createOrJoinRoom(socket);
            await saveRoomInDb(socket.userId, socket.roomId);
            await redisLib.makeHelperAvailable(socket.helper,socket.userId, socket.userName);
            console.log("online",await redisLib.getOnlineHelperCount());
            socket.on('room-chat-msg', (data) => {
                data['chatId'] = shortid.generate()
                data.senderId = socket.userId;
                data.senderName = socket.userName;
                data.chatRoom = socket.roomId;
                eventEmitter.emit('save-chat',data);
                })
            socket.on("disconnect",async ()=>{
                leaveRoom(socket);
                await redisLib.makeHelperOffline(socket.helper, socket.userId);
                console.log("online",await redisLib.getOnlineHelperCount());
            })
        })
    })

    eventEmitter.on('save-chat', (data) => {
        let newChat = new ChatModel({
            chatId: data.chatId,
            senderName: data.senderName,
            senderId: data.senderId,
            message: data.message,
            chatRoom: data.chatRoom || ''
        });
        console.log("Chat ROom", data.chatRoom);
    
        newChat.save((err, result) => {
            if (err) {
                console.log(`error occurred: ${err}`);
            }
            else if (result == undefined || result == null || result == "") {
                console.log("Chat Is Not Saved.");
            }
            else {
                io.sockets.in(data.chatRoom).emit('receive-message', data)
            }
        });
    
    });

    let saveRoomInDb = (userId, roomId) =>{

        let findRoom = () => {
            return new Promise((resolve, reject)=>{
                RoomModel.findOne({userId: userId})
                .select('-_id -__v')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        reject()
                    } else if (check.isEmpty(result)) {
                        resolve()
                    } else {
                        myIo.emit(userId,"room_created");
                        reject();
                    }
                })
            })
        }
    
        let createRoom = () => {
            return new Promise((resolve,reject)=>{
                let newRoom = new RoomModel({userId, roomId});
    
                newRoom.save((err, result) => {
                    if (err) {
                        console.log(`error occurred: ${err}`);
                    }
                    else if (result == undefined || result == null || result == "") {
                        console.log("Room Is Not Saved.");
                    }
                    else {
                        console.log("Room Saved.");
                        myIo.emit(userId,"room_created");
                    }
                })
            })
        }
    
        findRoom()
        .then(createRoom)
    
    }
}

let createOrJoinRoom = (socket) => {
    return new Promise((resolve, reject)=>{
        RoomModel.findOne({userId: socket.userId})
        .select('-_id -__v')
        .lean()
        .exec((err, result) => {
            if (err) {

            } else if (check.isEmpty(result)) {

            } else {
                const hasRoom = result.roomId;
                console.log("hasrooooooooooom",hasRoom)
                if(hasRoom){
                    socket.roomId = hasRoom;
                    socket.join(hasRoom);
                } else {
                    if(socket.helper){
                        if(userRooms.length){
                            socket.join(userRooms.pop())
                        } else {
                            let roomId = shortid.generate();
                            socket.roomId = roomId;
                            socket.join(roomId);
                            helperRooms.push(roomId);
                        }
                    } else {
                        if(helperRooms.length){
                            socket.join(helperRooms.pop())
                        } else {
                            let roomId = shortid.generate();
                            socket.roomId = roomId;
                            socket.join(roomId);
                            userRooms.push(roomId);
                        }
                    }
                }
            }
            resolve();
        })
    })  
    
}

let leaveRoom = (socket) => {
    socket.leave(socket.roomId);
}


module.exports = {
    setServer: setServer
}