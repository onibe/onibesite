"use strict";

const config = require('../../config.json');

const winston = require('winston'); // logger
winston.add(winston.transports.File, { filename: 'logs/'+ config.site_name +'.log' });

module.exports = winston;