const mongoose = require('mongoose');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')

/* Models */
const RoomModel = mongoose.model('Room')
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')

let getAllChatRooms = (req,res) => {
    RoomModel.find()
		.select('-_id -__v')
		.sort({"_id": -1})
		.limit(100)
		.lean()
		.exec((err, result) => {
			if (err) {
				logger.error(err.message, 'Room Controller: getAllChatRooms', 10)
				let apiResponse = response.generate(true, 'Error occured while getting all the rooms', 500, null)
				res.send(apiResponse)
			} else if (check.isEmpty(result)) {
				logger.info('No Room Found', 'Room Controller: getAllChatRooms', 5)
				let apiResponse = response.generate(true, 'No Rooms Found', 404, result)
				console.log(apiResponse)
				res.send(apiResponse)
			} else {
				logger.info('Rooms Found', 'Room Controller: getAllChatRooms', 5)
				let apiResponse = response.generate(false, 'Rooms Found', 200, result)
				res.send(apiResponse)
			}
		})
}

let getSingleChatRoom = (req,res) => {
	let validateParams = () => {
		return new Promise((resolve, reject) => {
		  if (check.isEmpty(req.params.roomId)) {
			logger.info('parameters missing', 'getSingleChatRoom handler', 9)
			let apiResponse = response.generate(true, 'parameters missing.', 403, null)
			reject(apiResponse)
		  } else {
			resolve()
		  }
		})
	  }
	  let getSingleChatRoom = () => {
		  return new Promise((resolve,reject)=>{
			RoomModel.findOne({roomId : req.params.roomId})
			.select('-_id -__v')
			.lean()
			.exec((err, result) => {
				if (err) {
					logger.error(err.message, 'Room Controller: getSingleChatRoom', 10)
					let apiResponse = response.generate(true, 'Error occured while getting the room', 500, null)
					reject(apiResponse)
				} else if (check.isEmpty(result)) {
					logger.info('No Room Found', 'Room Controller: getSingleChatRoom', 5)
					let apiResponse = response.generate(true, 'No Room Found', 404, result)
					reject(apiResponse)
				} else {
					logger.info('Room Found', 'Room Controller: getSingleChatRoom', 5)
					resolve(result)
				}
			})
		})
	}

	validateParams(req,res)
      .then(getSingleChatRoom)
      .then((result) => {
        let apiResponse = response.generate(false, 'Room Found', 200, result)
        res.send(apiResponse)
      })
      .catch((error) => {
        res.send(error)
      })
}

let getYourRooms = (req,res)=>{
	let getUserId=()=>{
		return new Promise((resolve,reject)=>{
			token.verifyClaimWithoutSecret(req.cookies.authToken, (err, result) => {
				if (err) {
					logger.info('user missing', 'getYourRooms handler', 9)
					let apiResponse = response.generate(true, 'user missing.', 403, null)
					reject(apiResponse)
				} else {
					resolve(result.data.userId)
				}
			})
		})
	}

	let getYourRooms = (userId) =>{
		return new Promise((resolve,reject)=>{
			let findQuery = {
					'joinees.userId' : userId
			}
			RoomModel.find(findQuery)
				.select('-_id -__v')
				.sort({"_id": -1})
				.limit(100)
				.lean()
				.exec((err, result) => {
					if (err) {
						logger.error(err.message, 'Room Controller: getYourRooms', 10)
						let apiResponse = response.generate(true, 'Error occured while getting your rooms', 500, null)
						reject(apiResponse)
					} else if (check.isEmpty(result)) {
						logger.info('No Room Found', 'Room Controller: getYourRooms', 5)
						let apiResponse = response.generate(true, 'No Room Found', 404, result)
						reject(apiResponse)
					} else {
						logger.info('Room Found', 'Room Controller: getYourRooms', 5)
						resolve(result)
					}
				})
		})
	}
	getUserId(req,res)
	  .then(getYourRooms)
      .then((result) => {
        let apiResponse = response.generate(false, 'Rooms Found', 200, result)
        res.send(apiResponse)
      })
      .catch((error) => {
        res.send(error)
      })
}

module.exports = {
	getAllChatRooms : getAllChatRooms,
	getSingleChatRoom : getSingleChatRoom,
	getYourRooms : getYourRooms
}