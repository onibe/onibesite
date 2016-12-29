'use strict';

// Enable Nunjucks for templating
const logger = require('morgan');

function configure(app, config) {
    app.use(logger('dev'));
}

module.exports = configure;