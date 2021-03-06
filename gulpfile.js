'use strict';

let gulp = require('gulp');
let babel = require('gulp-babel');
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let connect = require('gulp-connect');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let streamify = require('gulp-streamify');

gulp.task('lib', () => {
  return gulp.src('./src/**')
    .pipe(babel({
      presets: ['react'],
      plugins: ["transform-es2015-classes", "transform-es2015-modules-commonjs"]
    }))
    .pipe(gulp.dest('./lib'));
});

gulp.task('scripts', function () {
  let config = browserify({
    entries: './src/react-simple-typeahead.js',
    extensions: ['.js', '.jsx'],
    standalone: 'SimpleTypeahead',
    debug: true
  })
  .transform(babelify, {presets: ['es2015', 'react']});

  return config.bundle()
    .pipe(source('react-simple-typeahead.js'))
    .pipe(gulp.dest('dist'))
    .pipe(streamify(uglify()))
    .pipe(rename('react-simple-typeahead.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('connect', ['scripts', 'watch'], function() {
  connect.server({
    root: ['examples', './'],
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./examples/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.jsx', './src/*.js'], ['scripts']);
  gulp.watch(['./examples/*.html'], ['html']);
});

gulp.task('build', ['scripts', 'lib']);

