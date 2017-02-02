"use strict";

const config = require('../config.json');
const expressInit = require('../config/express-config.js');

// Routing Setup
const Route = require('./routes/index');
const Admin = require('./routes/admin');
const Api = require('./routes/api');

// Middleware
const middleware = require('./middleware');

const model = require('./models');
const session = model.session;

const expressApp = new expressInit(config);

expressApp.run(app => {
    // Set Session Configuration
    app.use(session.start());

    app.use('/', new Route(middleware).router);
    app.use('/api', new Api(middleware).router);
    app.use('/admin', new Admin(middleware).router);
});

module.exports = expressApp.app;