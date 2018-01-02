import gulp from 'gulp';
import plumber from 'gulp-plumber';

const applicationDir = './application/**/*';
const destDir = './dog';

gulp.task('php-watch', ['copy-application'], () => {
  gulp.watch(applicationDir, ['copy-application']);
});

gulp.task('copy-application', () => {
  gulp.src(applicationDir)
    .pipe(plumber())
    .pipe(gulp.dest(destDir));
});

gulp.task('default',  ['copy-application']);
