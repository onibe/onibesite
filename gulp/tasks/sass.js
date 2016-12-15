'use strict';

// StyleSheet Compilation
var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../../config.json');

var themePath = '/server/views/' + config.theme;

var styleDestination = __base + themePath + '/styles/main.scss';

gulp.task('sass:dev', function(){
    return gulp.src(styleDestination)
        .pipe(sass({
            outputStyle: 'nested',
            sourceComments: true,
            sourceMap: true,
            sourceMapContents: true,
            sourceMapEmbed: true
        }).on('error', sass.logError))
        .pipe(gulp.dest(__base + '/public/dist/'+ config.theme +'/styles'));
});

gulp.task('sass:server', function () {
    return gulp.src(styleDestination)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(__base + '/public/dist/'+ config.theme +'/styles'));
});