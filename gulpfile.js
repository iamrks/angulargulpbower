var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var dist = 'dist';

// compile sass files in to css
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(dist + '/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// browserSync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
});

// useref : Concat and Minify
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(dist));
});

// Optimizing Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            // Setting interlaced to true
            interlaced: true
        })))
        .pipe(gulp.dest(dist + '/images'));
});

// Copying Fonts to Dist
gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest( dist + '/fonts'));
});

// Cleaning up generated files automatically
gulp.task('clean:dist', function () {
    return del.sync(dist);
});

// copy templates with folder structure
gulp.task('copyhtml', function () {
    gulp.src(['app/js/src/**/*.html'])
        .pipe(gulp.dest(dist + '/js/src'));
});

// watcher
gulp.task('watch', ['browserSync', 'sass'], function () {
    // Reloads the browser whenever sass, HTML or JS files change
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// build
gulp.task('build', function (callback) {
    runSequence('clean:dist', ['sass', 'useref', 'copyhtml', 'images', 'fonts'], callback);
});

// gulp default
gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'], callback);
});