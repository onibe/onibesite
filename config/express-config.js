"use strict";

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const glob = require('glob');
const compression = require('compression');

// Pathing
const rootPath = path.normalize(__dirname);
const basePath = path.resolve(rootPath + '/..');

class expressInit {

    constructor(config) {
        this.app = express();
        this.config = config;
    }

    run(callback){
        const { app, config } = this;

        this.preInitialize();
        callback(app, config);
        this.postInitialize();
    }

    preInitialize() {
        const { app, config } = this;

        console.log('ENVIRONMENT:', app.get('env'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(compression());
        app.use(express.static(path.join(basePath, 'public')));

        // Modify Config
        // Nunjucks viewDirectory
        config.viewDirectory = path.resolve(basePath + '/server/views/' + config.theme + '/page');

        // Autoloaded Initializers
        const initializers = glob.sync(path.resolve(basePath + '/config/initializers/*.js'));
        initializers.forEach((initializer) => {
            const initilizerFile = require(initializer);
            initilizerFile(app,config);
        });
    }

    postInitialize() {
        const { app } = this;

        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function(err, req, res, next) {
                res.status(err.status || 500)
                    .render('global/error', {
                        message: err.message,
                        error: err
                    });
            });
        } else {
            // production error handler
            // no stacktraces leaked to user
            app.use(function(err, req, res, next) {
                res.status(err.status || 500)
                    .render('global/error', {
                        message: err.message,
                        error: {
                            status: err.status
                        }
                    });
            });
        }

        // Application Specific Loggin
        process.on('unhandledRejection', function(reason, p){
            console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
        });
    }
}

module.exports = expressInit;