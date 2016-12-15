"use strict";
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

var config = require('../../config.json');
var themePath = '../../server/views/' + config.theme + '/webpack.config.js';
var frontEndWebpack = require(themePath);

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