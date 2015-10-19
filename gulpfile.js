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

gulp.task('minify-js', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('third.concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('third.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
    return gulp.src(paths.css)
        .pipe(concat('third.concat.css'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('third.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('only-minify-js', ['clean-js'], function () {
    return gulp.src(paths.scripts)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('only-minify-js'));
});
gulp.task('only-minify-css', ['clean-css'], function () {
    return gulp.src(paths.css)
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss())
        .pipe(gulp.dest('only-minify-css'));
});

gulp.task('clean-js', function () {
    return gulp.src('only-minify-js', {read: false})
        .pipe(clean());
});

gulp.task('clean-css', function () {
    return gulp.src('only-minify-css', {read: false})
        .pipe(clean());
});

gulp.task('clean-dist', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean-dist', 'minify-js', 'minify-css']);
gulp.task('only', ['clean-js', 'only-minify-js', 'only-minify-css']);
gulp.task('clean', ['clean-dist', 'clean-js', 'clean-css']);