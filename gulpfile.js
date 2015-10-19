var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    scripts: 'src/js/*.js',
    css: 'src/css/*.css'
};

gulp.task('minify-js', function(){
    return gulp.src(paths.scripts)
        .pipe(jshint('.jshintrc'))
        .pipe(concat('third.concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('third.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
    return gulp.src(paths.css)
        .pipe(concat('third.concat.css'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('third.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('build', ['minify-js', 'minify-css']);