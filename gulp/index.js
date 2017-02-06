"use strict";

/*
 gulpfile.js
 ===========
 Rather than manage one giant configuration file responsible
 for creating multiple tasks, each task has been broken out into
 its own file in gulpfile.js/tasks. Any files in that directory get
 automatically required below.
 To add a new task, simply add a new task file that directory.
 gulpfile.js/tasks/default.js specifies the default set of tasks to run
 when you run `gulp`.
 */

const gulp = require('gulp');

const gulpDefault = require('./tasks/default');
const gulpSASS = require('./tasks/sass');
const gulpServer = require('./tasks/server');
const gulpWebpack = require('./tasks/webpack');

module.exports = function(config) {
    gulpDefault(gulp,config);
    gulpSASS(gulp,config);
    gulpServer(gulp,config);
    gulpWebpack(gulp,config);
};