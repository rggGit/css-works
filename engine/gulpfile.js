'use strict';
 
var gulp            = require('gulp'),
    compass         = require('gulp-compass'),
    jade            = require('gulp-jade'),
    browserSync     = require('browser-sync').create(),
    autoprefixer    = require('gulp-autoprefixer');

gulp.task('browserSync', function() {
  browserSync.init({
      server  : {
          baseDir : './dist/',
          index   : 'index.html'
      },
      ghostMode: false
  });
});

gulp.task('browserSync-ghost', function() {
  browserSync.init({
      server  : {
          baseDir : './dist/',
          index   : 'index.html'
      },
      ghostMode: true
  });
});

gulp.task('jade', function() {
  gulp.src('./app/jade/views/*.jade')
    .pipe(jade({pretty: true}).on('error', function(error){ console.log(error); }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});
 
gulp.task('js', function() {
  gulp.src('./app/js/**/*.js')
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});

gulp.task('compass', function() {
    gulp.src('./app/scss/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './dist/css',
            sass: './app/scss',
            cache: false
        }).on('error', function(error){
          console.log(error);
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});
 
gulp.task('default', ['jade', 'compass', 'js', 'browserSync'], function () {
  gulp.watch('./app/scss/**/*.scss', ['compass']);
  gulp.watch('./app/jade/**/*.jade', ['jade']);
  gulp.watch('./app/js/**/*.js', ['js']);
});
 
gulp.task('ghost-sync', ['jade', 'compass', 'js', 'browserSync-ghost'], function () {
  gulp.watch('./app/scss/**/*.scss', ['compass']);
  gulp.watch('./app/jade/**/*.jade', ['jade']);
  gulp.watch('./app/js/**/*.js', ['js']);
});