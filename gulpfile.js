// Load plugins/packages
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minify_css = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var imagemin = require('gulp-imagemin');
var imageminPng = require('imagemin-pngquant');
var imageminJpg = require('imagemin-jpeg-recompress');
var imageminJpegtran = require('imagemin-jpegtran');
var del = require('del');

// File paths
var DISTRIBUTION_PATH = 'public/dist';
var DISTRIBUTION_PATH_IMAGES = DISTRIBUTION_PATH + '/images';
var PUBLIC_PATH = 'public/';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var PUG_PATH = 'public/templates/**/*index.pug';
var IMAGES_PATH = 'public/images/**/*.{png, jpeg, jpg}';

// Gulp Task for CSS files
gulp.task('styles', function(done) { // Gulp v.4.0 needs done() for signal async completion
	console.log('STYLES Task Started!');
	return gulp.src(['public/css/main.css', CSS_PATH]) // This will add style.css first when concatanating css files
		.pipe(plumber(function(error) {
			console.log('Error with STYLES Task');
			console.log(error)
			this.emit('end'); // This will stop the next processes but still will keep the Gulp up
		}))
		.pipe(sourcemaps.init())
		.pipe(concat('styles.css'))
		.pipe(minify_css())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DISTRIBUTION_PATH))
		.pipe(livereload());
	done();
});

// Gulp Task for Java Script files
gulp.task('scripts', function(done) {
	console.log('SCRIPTS Task Started!');
	return gulp.src(SCRIPTS_PATH)
		.pipe(plumber(function(error) {
			console.log('Error with SCRIPTS Task');
			console.log(error)
			this.emit('end'); // This will stop the next processes but still will keep the Gulp up
		}))
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(DISTRIBUTION_PATH))
		.pipe(livereload()); // Used for automatic refresh of the page when changes are made
		done();
});

// Gulp Task for Pug files
gulp.task('pug', function(done) {
	console.log('PUG Task Started!');
	return gulp.src(PUG_PATH)
		.pipe(plumber(function(error) {
			console.log('Error with PUG Task');
			console.log(error)
			this.emit('end'); // This will stop the next processes but still will keep the Gulp up
		}))
		.pipe(pug({
			doctype: 'html',
			pretty: true
		}))
		.pipe(gulp.dest(PUBLIC_PATH))
		.pipe(livereload());
	done();
});

// Gulp Task for Images
gulp.task('images', function(done) {
	console.log('IMAGES Task Started!');
	return gulp.src(IMAGES_PATH)
		.pipe(imagemin(
			[
				imageminJpegtran({progressive: true}),
				imagemin.optipng(),
				imageminPng(),
				imageminJpg({quality: 'low'})
			]
		))
		.pipe(gulp.dest(DISTRIBUTION_PATH_IMAGES));
	done();
});

// Gulp Task to delete files and folders in distribution directory
gulp.task('clean', function (done) {
	console.log('CLEAN Task Started!');
	return del([
		DISTRIBUTION_PATH
	]);
	done();
});

// Gulp Task Default
gulp.task('default', gulp.parallel('styles', 'scripts', 'pug', 'images'), function(done) {
	console.log('DEFAULT Task Started!');
	done();
});

// Gulp Task for watching changes
gulp.task('watch', function(done) {
	console.log('WATCH Task Started!');
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, gulp.series('scripts'));
	gulp.watch(CSS_PATH, gulp.series('styles'));
	gulp.watch(PUG_PATH, gulp.series('pug'));
	done();
});
