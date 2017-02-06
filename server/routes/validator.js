'use strict';

const _ = require('lodash');

const message = {
    INVALID_PARAMETERS: 'Invalid Parameters',
    UPDATE_FAIL: 'Update Validation Failed',
};

const isBodyJSON = (body) => {
    return body && _.isObject(body) ? true : generateError(message.INVALID_PARAMETERS);
};

const isUpdateValid = (req) => {
    return (isBodyJSON(req.body) && req.params.id == req.body.id) ? true : generateError();
};

const generateError = (message) => {
    const err =  new Error(message || message.UPDATE_FAIL);
    err.status = 400;
    return err;
};

module.exports ={
    isBodyJSON,
    isUpdateValid
};