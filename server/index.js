"use strict";

const config = require('../config.json');
const expressInit = require('../config/express-config.js');

// Routing Setup
const routes = require('./routes/index');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const api = require('./routes/api');

const model = require('./models');
const session = model.session;

const expressApp = new expressInit(config);

expressApp.run(app => {
    // Set Session Configuration
    app.use(session.start());

    app.use('/', routes);
    app.use('/api', api);
    app.use('/auth', auth);
    app.use('/admin', admin);
});

module.exports = expressApp.app;