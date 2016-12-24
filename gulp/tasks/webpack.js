"use strict";
const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");

const config = require('../../config.json');
const themePath = '../../server/views/' + config.theme + '/webpack.config.js';
const frontEndWebpack = require(themePath);

gulp.task("webpack:dev", function(callback) {
    // run webpack
    webpack(frontEndWebpack, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});