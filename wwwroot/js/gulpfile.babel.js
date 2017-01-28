import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

gulp.task('default', ['build-js'], function(){
   return gulp.watch(['actions/*.js', 'reducers/*.js', '*.js', '!./bundle.*'], ['build-js'])
}).task('build-js', function(){
   return browserify('./app.js')
       .transform(babelify, {presets: ["es2015", "react"]})
       .bundle()
       .pipe(source('bundle.js'))
       .pipe(gulp.dest('./'));
});
