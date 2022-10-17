'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let otpSchema = new Schema({
  userId: {
    type: String,
    index: true,
    unique: true
  },
  otp: {
    type: String,
    required : true
  },
  createdOn :{
    type : Date,
    default: Date.now()
  }
})


mongoose.model('Otp', otpSchema);