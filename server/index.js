"use strict";

var express = require('express');

var app = express();

var config = require('../config.json');
var appInitializer = require('../config/express-config.js');
appInitializer.preInitialize(app,config);

// Routing Setup
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

app.use('/', routes);
app.use('/api', api);
app.use('/users', users);

// error handlers
appInitializer.postInitialize(app);

module.exports = app;