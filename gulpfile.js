// File path sources
const paths = {
	pug : {
		src : "./src/pug/pages/**/*.pug",
		dest : "./dist/",
		watch: "./src/pug/**/*.pug",
		clean : "./dist/**/*.html",
	},

	css : {
		src : "./src/styles/css/**/*.css",
		dest : "./dist/assets/css/",
		watch: "./src/styles/css/**/*.css",
		// clean : "./dist/assets/css/styles.min.css",
	},

	scss : {
		src : "./src/styles/scss/styles.scss",
		dest : "./dist/assets/css/",
		watch: "./src/styles/scss/**/*.scss",
		// clean : "./dist/assets/css/styles.min.css",
	},

	js : {
		src: "./src/js/**/*.js",
		dest : "./dist/assets/js/",
		watch: "./src/js/**/*.js",
		bundle: "app.min.js",
	},

	images : {
		src : "./src/images/**/*",
		dest : "./dist/assets/images/",
		watch : "./src/images/**/*",
	},

	browser: { base: "./dist" },
}

// GULP dependencies
const { src, dest, watch, series, parallel } = require("gulp")

// PUG dependencies
const pug = require("gulp-pug")

// SCSS dependencies
const scss = require("gulp-sass")(require("sass"))
const postcss = require("gulp-postcss")
const cssnano = require("cssnano")
const autoprefixer = require("autoprefixer")
// const purgeCss = require("gulp-purgecss")
// PostCSS Options
const postcssPlugins = [
	autoprefixer({ add: true }),
	cssnano({ core: false, zindex: true })
]

// JS/BABEL dependencies
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const terser = require("gulp-terser")

// IMAGES dependencies
const imagemin = require("gulp-imagemin")

const plumber = require("gulp-plumber")

// Browser-Sync dependencies
const { init, stream, reload } = require("browser-sync").create()
// LiveServer configs
function liveServer() {
	init({
		port: 4000,
		server: { baseDir: paths.browser.base }
	})
}

// ***** PUG Task*****
function compilePUG() {
	return src(paths.pug.src)
		.pipe(plumber())
		.pipe(pug({
			pretty: false,
			basedir: "./src/pug"
		}))
		.pipe(dest(paths.pug.dest))
}

// ***** CSS Task*****
function compileCSS() {
	return src(paths.css.src, { sourcemaps: true })
		.pipe(plumber())
		.pipe(concat("vendors.min.css"))
		.pipe(postcss(postcssPlugins))
		.pipe(dest(paths.css.dest, { sourcemaps: true }))
		.pipe(stream())
}

// ***** SCSS Task*****
function compileSCSS() {
	return src(paths.scss.src, { sourcemaps: true })
		.pipe(plumber())
		.pipe(scss())
		.pipe(concat("app.min.css"))
		.pipe(postcss(postcssPlugins))
		.pipe(dest(paths.scss.dest, { sourcemaps: true }))
		.pipe(stream())
}

// ***** JS Task*****
function compileJS() {
	return src(paths.js.src, { sourcemaps: true })
		.pipe(plumber())
		.pipe(babel({ presets: ["@babel/preset-env"] }))
		.pipe(concat(paths.js.bundle))
		.pipe(terser({ toplevel: true }))
		.pipe(dest(paths.js.dest, { sourcemaps: "." }))
}

// ***** IMAGES Task*****
function optimizeImg(cb) {
	return src(paths.images.src)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 50, progressive: true}),
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.svgo({
				plugins: [ {removeViewBox: true}, {cleanupIDs: false} ]
			})
		]))
		.pipe(dest(paths.images.dest))
}

// Watcher TASK
function watchTask(cb) {
	watch(paths.pug.watch, compilePUG).on("change", reload)
	watch(paths.scss.watch, compileSCSS)
	watch(paths.css.watch, compileCSS)
	watch(paths.js.watch, compileJS).on("change", reload)
	cb()
}

// Testing single tasks
// exports.compilePUG = compilePUG
// exports.compileCSS = compileCSS
// exports.compileSCSS = compileSCSS
// exports.compileJS = compileJS
// exports.optimizeImg = optimizeImg

exports.default = series(
	parallel(compilePUG, compileCSS, compileSCSS, compileJS),
	watchTask,
	liveServer,
)
