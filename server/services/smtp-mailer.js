'use strict';

const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport'); // Can replaced with normal SMTP

const config = require('../../config.json');

const options = {
    auth: {
        api_key: config.sendgrid_token
    }
};

// create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport(sendGridTransport(options));

const smtp = {};

/**
 * recipient: information about the recipient
 * */
smtp.sendMail = function(mail) {
    return new Promise(function(resolve, reject) {

        // setup e-mail data with unicode symbols
        const sender = {
            name: config.smtp_sender_name,
            email: config.smtp_sender_email
        };

        const mailOptions = {
            from: sender.name+' <'+sender.email+'>', // sender address
            to: [mail.email],            // list of receivers
            subject: mail.subject,    // Subject line
            html: mail.message      // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return reject(error);
            }

            resolve(info);
        });
    });
};

smtp.sendMailToAdmin = function(mail) {
    return new Promise(function(resolve, reject) {

        // setup e-mail data with unicode symbols
        const sender = {
            name: config.smtp_sender_name,
            email: config.smtp_sender_email
        };

        const mailOptions = {
            from: sender.name+' <'+sender.email+'>', // sender address
            to: [config.admin_email],            // list of receivers
            subject: mail.subject,    // Subject line
            html: mail.message      // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return reject(error);
            }

            resolve(info);
        });
    });
};


module.exports = smtp;