const mongoose = require('mongoose');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib')
const RoomModel = mongoose.model("Room");
const ChatModel = mongoose.model('Chat');

let getRoomChats = (req, res) => {

  let getRoomId = () => {
    return new Promise((resolve, reject)=>{
      RoomModel.findOne({userId: req.user.userId})
			.select('-_id -__v')
			.lean()
			.exec((err, result) => {
				if (err) {
					logger.error(err.message, 'Chat Controller: getRoomId', 10)
					let apiResponse = response.generate(true, 'Error occured while getting the room', 500, null)
					reject(apiResponse)
				} else if (check.isEmpty(result)) {
					logger.info('No Room Found', 'Chat Controller: getRoomId', 5)
					let apiResponse = response.generate(true, 'No Room Found', 404, result)
					reject(apiResponse)
				} else {
					logger.info('Room Found', 'Chat Controller: getRoomId', 5)
					resolve(result)
				}
			})
    })
  }
  
    // function to get chats.
    let findChats = (obj) => {
      return new Promise((resolve, reject) => {
        // creating find query.
        let findQuery = {
          chatRoom: obj.roomId
        }
  
        ChatModel.find(findQuery)
          .select('-_id -__v')
          .skip(parseInt(req.query.skip) || 0)
          .lean()
          .exec((err, result) => {
            if (err) {
              console.log(err)
              logger.error(err.message, 'Chat Controller: getUsersChat', 10)
              let apiResponse = response.generate(true, 'Error occured while getting the Chats', 500, null)
              reject(apiResponse)
            } else if (check.isEmpty(result)) {
              logger.info('No Chat Found', 'Chat Controller: getUsersChat')
              let apiResponse = response.generate(true, 'No Chat Found', 404, result)
              reject(apiResponse)
            } else {
              resolve(result.reverse())
            }
          })
      })
    } // end of the findChats function.
  
    // making promise call.
    getRoomId(req,res)
      .then(findChats)
      .then((result) => {
        let apiResponse = response.generate(false, 'All Room Chats Listed', 200, result)
        res.send(apiResponse)
      })
      .catch((error) => {
        res.send(error)
      })
  }

  module.exports = {
    getRoomChats : getRoomChats
}