"use strict";

const config = require('../config.json');
const expressInit = require('../config/express-config.js');

// Routing Setup
const routes = require('./routes/index');
const api = require('./routes/api');

const model = require('./models');
const session = model.session;

const expressApp = new expressInit(config);

expressApp.run(app => {
    // Set Session Configuration
    app.use(session.start());

    app.use('/', routes);
    app.use('/api', api);
});

module.exports = expressApp.app;