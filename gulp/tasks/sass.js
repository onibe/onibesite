'use strict';

// StyleSheet Compilation
const path = require('path');
const sass = require('gulp-sass');

module.exports = function(gulp,config) {

    const themePath = path.resolve('/server/views/' + config.theme);
    const styleSource = path.resolve(config.base_path + themePath + '/styles/index.scss');
    const styleDestination = path.resolve(config.base_path  + '/public/dist/'+ config.theme +'/styles');

    gulp.task('sass:dev', () => {
        return gulp.src(styleSource)
            .pipe(sass({
                outputStyle: 'nested',
                sourceComments: true,
                sourceMap: true,
                sourceMapContents: true,
                sourceMapEmbed: true
            }).on('error', sass.logError))
            .pipe(gulp.dest(styleDestination));
    });

    gulp.task('sass:server', () => {
        return gulp.src(styleSource)
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(gulp.dest(styleDestination));
    });
};

