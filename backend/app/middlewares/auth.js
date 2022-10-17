const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Auth = mongoose.model('Auth')

const logger = require('./../libs/loggerLib')
const responseLib = require('./../libs/responseLib')
const token = require('./../libs/tokenLib')
const check = require('./../libs/checkLib')

let isAuthorized = (req, res, next) => {
    let authToken = req.cookies.authToken || req.params.authToken || req.query.authToken || req.body.authToken;
    if(authToken) {
        token.verifyClaim(authToken,(err,decoded)=>{
            if(err){
                logger.error(err.message,'Authorization middleware',10)
                let apiResponse = responseLib.generate(true,'Failed to authorize',500,null)
                res.send(apiResponse)
            } else {
                console.log('decoded ' + decoded)
                req.user = {userId : decoded.data.userId}
                next()
            }
        })
    } else {
        logger.error('Authorization token missing', 'AuthorizationMiddleware',5)
        let apiResponse = responseLib.generate(true,'Authorization token is missing in request',401,null)
        res.send(apiResponse)
    }
}

module.exports = {
    isAuthorized : isAuthorized
}