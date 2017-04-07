"use strict";

const config = require('../config.json');
const expressInit = require('../config/express-config.js');

// Routing Setup
const site = require('./routes/site-route');
const admin = require('./routes/admin-route');
const api = require('./routes/api-route');

const model = require('./models');

const expressApp = new expressInit(config);

expressApp.run(app => {
    // Set Session Configuration
    app.use(model.session.start());

    app.use('/', site.router);
    app.use('/api', api.router);
    app.use('/admin', admin.router);
});

module.exports = expressApp.app;