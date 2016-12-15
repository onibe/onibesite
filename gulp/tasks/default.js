'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('watch', function(){
    // Client Side Watcher
    gulp.watch('./server/**/*.scss', ['sass:dev']);

    // Server Restart
    gulp.watch('./server/**/*.{js,njs}', ['server']);
    gulp.watch('./server/views/**/*.{js,njs}', ['webpack:dev']);
});

gulp.task('clean:dist', function(){
    return del([
        './public/dist'
    ]);
});


gulp.task('dev', function(){
    runSequence('clean:dist',['sass:dev','webpack:dev'],['server','watch']);
});

gulp.task('build', function(){
    runSequence('clean:dist',['sass:server','webpack:dev']);
});

gulp.task('default',['dev']);