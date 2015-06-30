var gulp = require('gulp');
var browserify = require('browserify');
var mocha = require('gulp-mocha');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('build', ['test'], function () {
    return browserify('src/index.js', {debug: true})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('test', function () {
    return gulp.src('test/*', {read: false})
        .pipe(mocha());
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./src/*', ['build']);
});

gulp.task('serve', ['watch'], function () {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: 'http://localhost:8000/index.html'
        }));
});
