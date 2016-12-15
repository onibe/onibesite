"use strict";

function jsonRequestValidator(data){
    var body;
    try {
        body = JSON.parse(data.body);
        if(body.error && body.error.code){
            return Promise.reject(data);
        }
    } catch(e){
        return Promise.reject(e);
    }

    return {
        body: body,
        statusCode: data.statusCode
    };
}

module.exports = {
    jsonRequestValidator: jsonRequestValidator
};