'use strict';

var assert = require('chai').assert;
var mail = require('./smtp-mailer');

describe('smtp-mailer', function() {

    it('should send mail', function (done) {

        var message = {
            email: 'uri@keyfoundryllc.com',
            subject: 'test',
            message: 'test'
        };

        mail.sendMail(message).then(function(data){
            assert.equal('success', data.message);
            done();
        }).catch(function(error) {
            console.log(error,'nice');
        });

    });
});

