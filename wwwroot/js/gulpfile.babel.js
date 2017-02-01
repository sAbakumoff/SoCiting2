import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';

gulp.task('default', ['build-js'], function(){
   return gulp.watch(['actions/*.js', 'reducers/*.js', '*.js', '!./bundle.*'], ['build-js'])
}).task('build-js', function(){
    process.env.NODE_ENV = 'production';
   return browserify('./app.js')
       .transform(babelify, {presets: ["es2015", "react"]})
       .bundle()
       .pipe(source('bundle.js'))
       .pipe(buffer())
       .pipe(uglify())
       .pipe(gulp.dest('./'));
});
