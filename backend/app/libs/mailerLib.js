const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const appConfig = require('../../config/appConfig');

const transport = nodemailer.createTransport(sendgridTransport({
    service: 'SendGrid',
    auth: {
        user: appConfig.mailer.user,
        pass: appConfig.mailer.pass,
        api_key: appConfig.mailer.api_key
    }
}))


let sendOTPEmail = (email,OTP) => {
    transport.sendMail({
        to: email,
        from: appConfig.mailer.user,
        subject: 'ConvoCare OTP',
        html: '<h2>'+OTP+'</h2>'
    })
    .then(console.log('Success!'))
    .catch(err => console.log(err))
}

module.exports = {
    sendOTPEmail: sendOTPEmail
}
