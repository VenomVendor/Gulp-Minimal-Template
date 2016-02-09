'use strict';

/* eslint-disable func-names, arrow-body-style */

const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const csscomb = require('gulp-csscomb');
const cssnano = require('gulp-cssnano');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gutil = require('gulp-util');
const jshint = require('gulp-jshint');
const open = require('gulp-open');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stylish = require('jshint-stylish');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');

// prefer array
const cssSrc = ['sass/**/*.{sass,scss}'];
const jsSrc = ['js/**/*.js'];
const libSrc = 'js/libs/**/*.js';

// prefer string.
const dest = 'dist';
const cssDest = `${dest}/css`;
const jsDest = `${dest}/js`;

const DEBUG = false;
const ES6 = false;
const SHOULD_RENAME = false;
const PORT = 8080;

/**
 * Files to be copied.
 * Reference is from root directory of gulpfile.js
 * @param files
 */
const copier = (files) => {
    /* eslint-disable object-curly-spacing */
    gulp.src(files, {base: './'})
        /* eslint-enable object-curly-spacing */
        .pipe(plumber())
        .pipe(gulp.dest(dest));
};

/**
 * Array of path of files/folders to be deleted.
 * @param destFdr
 */
const deleteFilesDirs = (destFdr) => {
    del.sync(destFdr);
};

/**
 * Convert sass to css with source map.
 * After converting, prefix css with vendor prefix.
 * After adding vendor prefix, sort css properties w.r.t csscomb.
 * After combing minify css if not a debug version.
 */
gulp.task('sass', () => {
    deleteFilesDirs([cssDest]);
    return gulp.src(cssSrc)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            // outputStyle: DEBUG ? 'expanded' : 'compressed',
            outputStyle: 'expanded',
            sourceComments: true,
            sourceMap: true,
            sourceMapContents: true,
            sourceMapEmbed: true,
            indentWidth: 4
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer([
            'last 3 version',
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 5']))
        .pipe(csscomb())
        .pipe(gulp.dest(cssDest))
        .pipe(DEBUG ? gutil.noop() : cssnano())
        .pipe(SHOULD_RENAME ? rename({
            suffix: '.min'
        }) : gutil.noop())
        .pipe(gulp.dest(cssDest));
});

/**
 * js-lint/es-lint js.
 */
gulp.task('js-lint', () => {
    return gulp.src(jsSrc.concat(`!${libSrc}`))
        .pipe(ES6 ? eslint() : jshint())
        .pipe(ES6 ? eslint.format() : jshint())
        .pipe(ES6 ? gutil.noop() : jshint.reporter(stylish));
});

/**
 * es-lint gruntfile.js
 */
gulp.task('js-self-lint', () => {
    return gulp.src(['*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * copy 3rd party *.js under `libs/`
 * Convert from ES6 to ES5 via babel if required.
 * uglify js.
 */
gulp.task('js-uglify', () => {
    // TODO-Ignore libs dir.
    // @see https://www.npmjs.com/package/del#beware
    deleteFilesDirs([`${jsDest}/**`, `!${jsDest}/`, `!${jsDest}/libs`, `!${jsDest}/libs/**/*.js`]);
    copier([libSrc]);
    return gulp.src(jsSrc.concat(`!${libSrc}`))
        .pipe(plumber())
        .pipe(ES6 ? sourcemaps.init() : gutil.noop())
        .pipe(ES6 ? babel() : gutil.noop())
        .pipe(ES6 ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest(jsDest))
        .pipe(SHOULD_RENAME ? rename({
            suffix: '.min'
        }) : gutil.noop())
        .pipe(gulp.dest(jsDest))
        .pipe(DEBUG ? gutil.noop() : uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('clean-copy', () => {
    deleteFilesDirs(dest);
    copier([libSrc]);
});

/**
 * watch for changes is sass & js files.
 */
gulp.task('watch', () => {
    gulp.watch(['gulpfile.js'], ['js-self-lint']);
    gulp.watch(cssSrc, ['sass']);
    gulp.watch(jsSrc, ['js-lint', 'js-uglify']);
});

/**
 * create webserver, simlar to serve static in express.
 * open default uri.
 */
gulp.task('webserver', () => {
    connect.server({
        livereload: true,
        port: PORT
    });
    gulp.src('')
        .pipe(open({
            uri: `http://localhost:${PORT}`
        }));
});

/**
 * reload browser on change of src files.
 */
gulp.task('livereload', () => {
    watch([`${cssDest}/*.css`, `${jsDest}/*.js`, '*.html'])
        .pipe(connect.reload());
});

/* default task */
gulp.task('default', ['js-self-lint', 'clean-copy', 'sass', 'js-lint', 'js-uglify', 'webserver', 'livereload',
    'watch']);
