"use strict";

const config = require('../config.json');
const expressInit = require('../config/express-config.js');

// Routing Setup
const routes = require('./routes/index');
const api = require('./routes/api');

const expressApp = new expressInit(config);

const data = require('./data');
const model = require('./models');

// Check if there is a database connection
data.authenticate()
    .then(() => {
        model.sync();

        expressApp.run(app => {
            app.use('/', routes);
            app.use('/api', api);
        });
    });

model.sync();

expressApp.run(app => {
    app.use('/', routes);
    app.use('/api', api);
});
// Return Express App
module.exports = expressApp.app;