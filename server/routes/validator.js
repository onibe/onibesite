'use strict';

const _ = require('lodash');

const isObject = (body) => {
    return body && _.isObject(body);
};

module.exports ={
    isObject
};