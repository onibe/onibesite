"use strict";

const path = require('path');
const rootPath = path.normalize(__dirname);
global.__base = path.resolve(rootPath + '/..');

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const glob = require('glob');
const compression = require('compression');

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

        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__base, 'public')));
        app.use(compression());


        // Modify Config
        // Nunjucks viewDirectory
        config.viewDirectory = path.resolve(__base + '/server/views/' + config.theme + '/page');

        // Autoloaded Initializers
        const initializers = glob.sync(path.resolve(__base + '/config/initializers/*.js'));
        initializers.forEach(function (initializer) {
            const initilizerFile = require(initializer);
            initilizerFile(app,config);
        });
    }

    postInitialize() {
        const { app, config } = this;

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
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('global/error', {
                message: err.message,
                error: {}
            });
        });

        process.on('unhandledRejection', function(reason, p){
            console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
            // application specific logging here
        });
    }
}

module.exports = expressInit;