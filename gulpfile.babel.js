import gulp from 'gulp';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import cssmin from 'gulp-cssnano';
import babel from 'gulp-babel';
import jsmin from 'gulp-uglify';
import rename from 'gulp-rename';
// Browser Sync (Live reload)
import browserSync from 'browser-sync';
const server = browserSync.create();
// End Browser Sync (Live reload)

const paths = {
  pug: {
    src: './dev/pug/*.pug',
    dest: './app',
    watch: './dev/pug/**/*.pug'
  },

  styles: {
    src: './dev/scss/*.scss',
    dest: './app/styles',
    watch: './dev/scss/**/*.scss'
  },

  scripts: {
    src: './dev/scripts/*.js',
    dest: './app/js',
    watch: './dev/scripts/**/*.js'
  },

  images: {
    src: './dev/images/*',
    dest: './app/img/'
  }
};

// Compiling pug to html
gulp.task('pug', () =>
  gulp.src(paths.pug.src)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(server.stream())
);

// Compiling sass to css
gulp.task('styles', () =>
  gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // Uncomment cssmin at the end of the project
    // .pipe(cssmin())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream({match: '**/*.css'}))
);

// Compiling JS files
gulp.task('scripts', () => 
  gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(jsmin())
    .pipe(rename('scripts.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(server.stream())
);

// Init BrowserSync (Live reload)
gulp.task('default', ['pug', 'styles', 'scripts'], () => {
  server.init({
    server: './app'
  });
  // Watching changes on pug files, run the necesary task and reload the server
  gulp.watch(paths.pug.watch, ['pug', server.reload]);
  // Watching changes on scss files
  gulp.watch(paths.styles.watch, ['styles']);
  // Watching changes on SASS files, run the necesary task and reload the server
  gulp.watch(paths.scripts.watch, ['scripts', server.reload]);
  // Watching changes on html files
  // gulp.watch('./app/**/*.html').on('change', server.reload);
});