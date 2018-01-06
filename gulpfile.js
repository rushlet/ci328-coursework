var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('bundle-js', function() {
  return gulp.src(['js/main.js', 'js/loadAssets.js', 'js/config.js', 'js/entities.js', 'js/player.js', 'js/infiniteImprobability.js', 'js/menus.js', 'js/utilities.js', 'js/ui.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./bundled/'));
});

gulp.task('watch', function(){
  gulp.watch('js/*.js', ['bundle-js']);
})

gulp.task('default', ['bundle-js']);
