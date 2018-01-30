import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssmin from 'cssnano';
import babel from 'gulp-babel';
import jsmin from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
const server = browserSync.create();

const paths = {
  pug : {
    src : 'dev/pug/*.pug',
    dest : 'app',
    watch : 'dev/pug/**/*.pug'
  },
  styles : {
    src : 'dev/scss/*.scss',
    dest : 'app/styles',
    watch : 'dev/scss/**/*scss'
  },
  scripts : {
    src : 'dev/scripts/*.js',
    dest : 'app/js',
    watch : 'dev/scripts/**/*.js'
  }
};

const postcssPlugins = [
  cssmin({
    core: false,
    autoprefixer : {
      add : true,
      browsers : '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
    }
  })
];

const sassOptions = { outputStyle: 'compact' };


gulp.task('pug', () =>
  gulp.src(paths.pug.src)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(server.stream())
);

gulp.task('styles', () =>
  gulp.src(paths.styles.src)
    .pipe(sourcemaps.init({ loadMaps : true }))
    .pipe(plumber())
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream({match : '**/*.css' }))
);

gulp.task('scripts', () =>
  gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(jsmin())
    .pipe(rename('scripts.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(server.stream())
);

gulp.task('default', ['pug', 'styles', 'scripts'], () => {
  server.init({
    server : {
      baseDir : './app'
    }
  });

  gulp.watch(paths.styles.watch, ['styles']);
  gulp.watch(paths.pug.watch, ['pug', server.reload]);
  gulp.watch(paths.scripts.watch, ['scripts', server.reload])
});