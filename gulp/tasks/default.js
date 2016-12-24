'use strict';

const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('watch', () => {
    // Client Side Watcher
    gulp.watch('./server/**/*.scss', ['sass:dev']);

    // Server Restart
    gulp.watch('./server/**/*.{js,njs}', ['server']);
    gulp.watch('./server/views/**/*.{js,njs}', ['webpack:dev']);
});

gulp.task('clean:dist', () => {
    return del([
        './public/dist'
    ]);
});


gulp.task('dev', () => {
    runSequence('clean:dist',['sass:dev','webpack:dev'],['server','watch']);
});

gulp.task('build', () => {
    runSequence('clean:dist',['sass:server','webpack:dev']);
});

gulp.task('default',['dev']);