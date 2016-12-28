"use strict";

const path = require('path');
global.__base = path.resolve(__dirname, '../../');

const model = require('../models');

model.sync()
    .then(() => {
        console.log('Success: Database cleanup');
    })
    .catch(err => {
        console.log('Error: Database cleanup:', err);
    });