const check = require('./checkLib')
const redis = require('redis')
let client = redis.createClient()

client.on('connect',()=>{
    console.log('Redis connection is successfully opened')
})
const aGroup = "availableHelpers";
const uGroup = "unavaiableHelpers";

let getAvaiableHelper = ()=>{
    return new Promise((resolve,reject)=>{
        client.HGETALL(aGroup,(err,result)=>{
            if(err){
                console.log(err)
                reject(err)
            } else {
                resolve(Object.keys(result)[0]);
            }
        })
    }) 
}

let makeHelperAvailable = (helper, userId,userName)=>{
    if(helper){
        client.HDEL(uGroup,userId);
        return new Promise((resolve,reject)=>{
            client.HMSET(aGroup,[userId,userName],(err,result)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(result);
                }
            })
        }) 
    }
}

let makeHelperUnAvailable = (helper, userId,userName)=>{
    if(helper){
        client.HDEL(aGroup,userId);
        return new Promise((resolve,reject)=>{
            client.HMSET(uGroup,[userId,userName],(err,result)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(result);
                }
            })
        }) 
    }
}

let makeHelperOffline = (helper, userId)=>{
    if(helper){
        client.HDEL(aGroup,userId);
        client.HDEL(uGroup,userId);
    }
}

let getOnlineHelperCount = () => {
    return new Promise((resolve,reject)=>{
        client.HLEN(aGroup,(err,aresult)=>{
            client.HLEN(uGroup,(err,bresult)=>{
                if(err){
                    console.log(err)
                    reject(err)
                } else {
                    resolve(aresult + bresult);
                }
            })
        })
    }) 
}


module.exports = {
    getAvaiableHelper : getAvaiableHelper,
    makeHelperAvailable : makeHelperAvailable,
    makeHelperUnAvailable: makeHelperUnAvailable,
    makeHelperOffline: makeHelperOffline,
    getOnlineHelperCount : getOnlineHelperCount
}