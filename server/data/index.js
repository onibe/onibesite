'use strict';

const Database = require('./database');
const config = require('../../config.json');

module.exports = new Database(config);