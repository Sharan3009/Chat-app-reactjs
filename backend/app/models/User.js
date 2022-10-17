'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    required : true
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required : true
  },
  createdOn :{
    type : Date,
    default: Date.now()
  },
  helper : {
    type : Boolean,
    default : false
  }
})


mongoose.model('User', userSchema);