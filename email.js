let emailjs = require('emailjs');
const log4js = require('./log4js');
const  logger = log4js.logger_email;
let server = emailjs.server.connect({
    user: "your_email@xx.com",
    password: "",
    host: "smtp.com",
    ssl: true
});

function sendEmail(to,subject,text){
    let emailObj = {};
    emailObj.from = "you_email@xx.com";
    emailObj.to = to;
    emailObj.subject = subject;
    emailObj.text = text;

    server.send(emailObj, (err,message) => {
        if(err){
            logger.error('Email send failed,err:'+ err.name + ','+err.message);
        }else{
            logger.info('Email send success.');
        }
    });
}
exports.sendEmail = sendEmail;