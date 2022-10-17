const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const passwordLib = require('../libs/generatePasswordLib')
const mailerLib = require('../libs/mailerLib')
const otpGenerator = require('otp-generator')

/* Models */
const UserModel = mongoose.model('User')
const OtpModel = mongoose.model('Otp')

// User Signup function 
let generateOTP = (req, res) => {
    let validateUserInput = () =>{
        return new Promise((resolve,reject)=>{
            if(req.body.email){
                if(!validateInput.Email(req.body.email)){
                    let apiResponse = response.generate(true,'Email Does not meet the requirement',400,null)
                    reject(apiResponse)
                } else {
                    resolve()
                }
            } else {
                logger.error('Field Missing during User creation','User Controller : validateUserInput' , 5)
                let apiResponse = response.generate(true,'One or more Parameter(s) is missing',400,null)
                reject(apiResponse)
            }
        })
    }

    let createUser = () =>{
        return new Promise((resolve,reject)=>{
            let newUser = new UserModel({
                userId : shortid.generate(),
                firstName : 'John',
                lastName : 'Doe',
                email : req.body.email.toLowerCase(),
                createdOn : time.now(),
                active:false
            })
            newUser.save((err,newUser)=>{
                if(err){
                    console.log(err)
                    logger.error(err.message,'User Controller : createUser', 10)
                    let apiResponse = response.generate(true,'Failed to create new user',400,null)
                    reject(apiResponse)
                } else {
                    // delete keyword will not working until you convert it to js object using toObject()
                    let newUserObj = newUser.toObject()
                    delete newUserObj.__v;
                    delete newUserObj._id;
                    delete newUserObj.email;
                    delete newUserObj.active;
                    resolve(newUserObj)
                }
            })
        })
    }

    let generateOTP = (userObj) =>{
        return new Promise((resolve,reject)=>{
            let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            let newOtp = new OtpModel({
                userId : userObj.userId,
                otp : passwordLib.hashpassword(otp),
                createdOn : time.now(),
            })
            mailerLib.sendOTPEmail(userObj.email,otp);
            newOtp.save((err,newOtp)=>{
                if(err){
                    console.log(err)
                    logger.error(err.message,'User Controller : generateOTP', 10)
                    let apiResponse = response.generate(true,'Failed to create new otp',400,null)
                    reject(apiResponse)
                } else {
                    resolve(userObj);
                }
            })
        })
    }
    validateUserInput(req,res)
    .then(createUser)
    .then(generateOTP)
    .then((resolve)=>{
        let apiResponse = response.generate(false,'OTP email is sent successfully',200,resolve)
        res.send(apiResponse)
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
} 

// Login function 
let verifyOTP = (req, res) => {
    let findUser = () => {
        return new Promise((resolve,reject)=>{
            if(req.body.userId){
                OtpModel.findOne({userId: req.body.userId},(err,userDetails)=>{
                    if(err){
                        console.log(err)
                        logger.error('Failed to Retrieve User Data', 'User Controller : findUser',5)
                        let apiResponse = response.generate(true,'Failed to find the user',400,null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found','User Controller : findUser',5)
                        let apiResponse = response.generate(true,'No User Details Found',400,null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found','User Controller : findUser',5)
                        resolve(userDetails)
                    }
                })
            } else {
                let apiResponse = response.generate(true,'userId parameter is missing',400,null)
                reject(apiResponse)
            }
        })
    }

    let validateOtp = (retrievedUserDetails) => {
        return new Promise((resolve,reject)=>{
            passwordLib.comparePassword(req.body.otp,retrievedUserDetails.otp,(err,isMatch)=>{
                if(err){
                    console.log(err)
                    logger.error(err.message,'User Controller : validateOtp',5)
                    let apiResponse = response.generate(true,'Validation Otp Failed',500,null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.error('Login failed due to incorrect OTP','User Controller : validatePassword',5)
                    let apiResponse = response.generate(true,'OTP did not match. Please enter again',500,null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        return new Promise ((resolve,reject)=>{
            token.generateToken(userDetails.userId,(err,tokenDetails)=>{
                if(err){
                    console.log(err)
                    let apiResponse = response.generate(true,'Failed to generate token',500,null)
                    reject(apiResponse)
                } else {
                    res.cookie("authToken",tokenDetails.token);
                    resolve(true)
                }
            })
        })
    }

    findUser(req,res)
    .then(validateOtp)
    .then(generateToken)
    .then((resolve)=>{
        let apiResponse = response.generate(false,'Otp verified successfully',200,resolve)
        res.send(apiResponse)
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
}


module.exports = {

    generateOTP: generateOTP,
    verifyOTP: verifyOTP,

}