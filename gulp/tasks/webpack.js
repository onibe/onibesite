"use strict";
const path = require("path");
const gutil = require("gulp-util");
const webpack = require("webpack");

module.exports = function(gulp,config) {
    const themePath = path.resolve(config.base_path + '/server/views/' + config.theme + '/webpack.config.js');
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
};