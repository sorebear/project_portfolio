var gulp = require("gulp");
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");
var autoPrefixer = require("gulp-autoprefixer");
var liveReload = require("gulp-livereload");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var del = require("del");

// File Paths to Watch
var DIST_PATH = "public/dist";
var SCRIPTS_PATH = "public/scripts/**/*.js";
var CSS_PATH = "public/css/**/*.css";
var IMAGES_PATH = "public/img/**/*.{png,jpeg,jpg,svg,gif}";

//Image Compression
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminJpegRecompress = require("imagemin-jpeg-recompress");

// CSS Styles
 gulp.task('styles', function() {
    console.log('Starting Styles Task');
    return gulp.src(['public/css/reset.css', CSS_PATH])
        .pipe(plumber(function(err) {
            console.log('Styles Task Error: ', err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoPrefixer())
        .pipe(concat('styles.min.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(liveReload())
 });

// Scripts
gulp.task("scripts", function() {
	console.log("Starting Scripts Task");
	return gulp
		.src(SCRIPTS_PATH)
		.pipe(
			plumber(function(err) {
				console.log("Scripts Task Error: ", err);
				this.emit("end");
			})
		)
		.pipe(
			babel({
				presets: ["es2015"]
			})
		)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat("main.min.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(liveReload());
});

// Images
gulp.task("images", function() {
	console.log("Starting Images Task");
	return gulp
		.src(IMAGES_PATH)
		.pipe(
			imagemin([
				imagemin.gifsicle(),
				imagemin.jpegtran(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPngquant(),
				imageminJpegRecompress()
			])
		)
		.pipe(gulp.dest(`${DIST_PATH}/img`));
});


gulp.task("clean", function() {
	return del.sync([DIST_PATH]);
});

// Default Task
gulp.task(
	"default",
	["clean", "images", "styles", "scripts"],
	function() {
		console.log("Starting Default Task");
	}
);

// Watch Files For Changes
gulp.task("watch", ["default"], function() {
	console.log("Starting Watch Task");
	require("./server.js");
	liveReload.listen();
	gulp.watch(SCRIPTS_PATH, ["scripts"]);
	gulp.watch(CSS_PATH, ['styles']);
});
