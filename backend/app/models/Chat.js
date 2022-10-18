const mongoose = require('mongoose')

const Schema = mongoose.Schema

let chatSchema = new Schema({
    chatId : { type : String, unique : true, required : true },
    senderName : { type : String, required : true },
    senderId : { type : String, required : true },
    message : { type : String, required : true },
    chatRoom : { type : String, required : true },
    type: {type: Number, default: 1},
    createdOn : { type : Date, required: true }
})

mongoose.model('Chat',chatSchema)