"use strict";

const express = require('express');

const app = express();

const config = require('../config.json');
const appInitializer = require('../config/express-config.js');
appInitializer.preInitialize(app,config);

// Routing Setup
const routes = require('./routes/index');
const users = require('./routes/users');
const api = require('./routes/api');

app.use('/', routes);
app.use('/api', api);
app.use('/users', users);

// error handlers
appInitializer.postInitialize(app);

module.exports = app;