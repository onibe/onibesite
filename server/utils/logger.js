"use strict";

var config = require('../../config.json');

var winston = require('winston'); // logger
winston.add(winston.transports.File, { filename: 'logs/'+ config.site_name +'.log' });

module.exports = winston;