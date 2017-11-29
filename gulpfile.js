var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
var developServer = require('gulp-develop-server');
var runSequence = require('run-sequence');
 
const dirs = {
  src: 'src',
  dest: 'build'
};
 
gulp.task('css', () => {
  return gulp.src('/client/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(dirs.dest+'/css'));
});

gulp.task('server', () => {
  developServer.listen({
    path: './index.js',
    cwd: './build/server',
  });

  gulp.watch([
    'build/server/**/*.js'
  ], developServer.restart);
});

gulp.task('js:server', () => {
  return gulp.src('server/**/*.js')
  	.pipe(babel({presets: ['env']}))
    .pipe(gulp.dest(dirs.dest+'/server'));
});

gulp.task('clean', () => del(['build']));

gulp.task('serve', function (callback) {
  return runSequence('clean', ['css', 'js:server'], ['server'], callback);
});
