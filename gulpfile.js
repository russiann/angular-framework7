const gulp   = require('gulp');
const concat = require('gulp-concat');
const babel  = require('gulp-babel');
const iife   = require('gulp-iife');

gulp.task('default', () => {
  return gulp.src([
    './src/detectDevice.js',
    './src/hooks-plugin.js',
    './src/module.js',
    './src/hooks.js',
    './src/framework7.js',
    './src/compile.js',
    './src/hash-router.js',
    './src/router.js',
    './src/services/services.js',
    './src/services/modals.js',
    './src/services/popups.js',
    './src/services/progressbar.js',
    './src/services/picker.js',
    './src/directives/directives.js',
    './src/directives/goBack.js',
    './src/directives/goTo.js',
  ])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(iife({
      useStrict: false
    }))
    .pipe(concat('angular-framework7.js'))
    .pipe(gulp.dest('./dist/'));
});
