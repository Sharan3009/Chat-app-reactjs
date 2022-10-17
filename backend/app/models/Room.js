const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let roomSchema = new Schema({
    userId:{
        type: String,
        required: true,
        index: true
    },
    roomId:{
        type : String,
        required : true,
    }
})

mongoose.model('Room',roomSchema)