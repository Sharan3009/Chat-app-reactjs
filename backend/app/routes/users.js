const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    // params: email
    app.post(`${baseUrl}/otp`, userController.generateOTP);

    // params: otp
    app.post(`${baseUrl}/verify`, userController.verifyOTP);

}
