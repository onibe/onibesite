"use strict";

const express = require('express');
const smtp = require('../services/smtp-mailer');

const router = express.Router();

/* GET Main Page */
router.get('/contact', function(req, res, next) {
    res.json({'message':'Use Post Method to send information'});
});

/* GET Home Page */
router.post('/contact', function(req, res, next) {

    const adminMessage = adminMessageFormatter(req.body);
    const customerMessage = customerMessageFormatter(req.body);

    if(messageValidator(adminMessage)){
        smtp.sendMailToAdmin(adminMessage)
            .then(function() {
                return smtp.sendMail(customerMessage);
            })
            .then(function(data) {
                res.send(data);
            });
    } else {
        res.status(400).send({message: "invalid request"});
    }

});

/* GET home page. */
router.get('/version', function(req, res, next) {
    res.json({'version':'alpha-0.0.1'});
});

// Replace this with an actual Validator
function messageValidator(obj) {
    let valid = true;
    Object.keys(obj).forEach(function(key) {
        if(obj[key] === null){
            valid = false;
        }
    });

    return valid;
}

function adminMessageFormatter(form) {
    const text = `Name: ${form.name} <br />
    Email: ${form.email}  <br />
    Project: ${form.projects.join(", ")}  <br />
    Budget: ${form.budget}  <br />
    Phone: ${form.phone}  <br />
    Location: ${form.location}  <br />
    Message: ${form.message}`;

    return {
        subject: "Contact Form: " + form.name,
        message: text
    };
}

function customerMessageFormatter(form) {
    return {
        email: form.email,
        subject: "Contact Form: " + form.name,
        message: "Thank you for your message. We will respond as soon as we get hold of your message"
    };
}

module.exports = router;
