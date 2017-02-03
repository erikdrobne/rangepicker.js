var gulp = require('gulp');
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify');

var stylesDir = 'src/assets/sass/**/*.scss'
    jsFile = 'src/rangepicker.js';

gulp.task('copy-html', function() {
    gulp.src('index.html').pipe(gulp.dest('build'));
});

gulp.task('build-css', function(done) {
    gulp.src(stylesDir)
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename('rangepicker.css'))
        .pipe(gulp.dest('./build/'))
        .on('end', done);
});

gulp.task('build-js', function() {
    return gulp.src(jsFile)
        .pipe(gulp.dest('build'))
        .pipe(jshint({
            lookup: true
        }))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('build'))
        .pipe(rename('rangepicker.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            directoryListing: {
                livereload: true,
                enable: true,
                path: 'index'
            },
            open: true,
            port: 3002
        }));
});

gulp.task('default', ['copy-html', 'build-css', 'build-js', 'webserver'], function() {
    gulp.watch(stylesDir, ['build-css']);
    gulp.watch(jsFile, ['build-js']);
});
