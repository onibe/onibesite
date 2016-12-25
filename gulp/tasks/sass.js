'use strict';

// StyleSheet Compilation
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const config = require('../../config.json');

const themePath = path.resolve('/server/views/' + config.theme);
const styleSource = path.resolve(__base + themePath + '/styles/index.scss');
const styleDestination = path.resolve(__base + '/public/dist/'+ config.theme +'/styles');

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