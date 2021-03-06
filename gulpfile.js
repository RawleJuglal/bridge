var gulp = require('gulp');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var ngAnnotate = require('browserify-ngannotate');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');



var interceptErrors = function(error) {
	var args = Array.prototype.slice.call(arguments);

	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);

	this.emit('end');
};


var jsFiles = "public/javascripts/**/*.js";
var cssFiles = "public/stylesheets/*.css";
var viewFiles = "public/javascripts/**/*.html";
var jquery = "public/vendors/jquery/*";
var tether = "public/vendors/tether/dist/js/*.min.js";
var popper = "public/vendors/popper.js/dist/esm/popper.js";
var fontAwesome = "public/vendors/font-awesome-4.7.0/css/*.min.css";
var bootstrapCSS = "public/vendors/bootstrap/css/*";
var bootstrapJS = "public/vendors/bootstrap/js/*"; 
var favicon = "public/*.ico";

gulp.task('lint', function(){
	return gulp.src('jsFiles')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('browserify', ['views'], function(){
	return browserify('./public/javascripts/app.js')
		.transform(babelify, {presets:["env"]})
		.transform(ngAnnotate)
		.bundle()
		.on('error', interceptErrors)
		.pipe(source('main.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('html', function(){
	return gulp.src("public/index.html")
		.on('error', interceptErrors)
		.pipe(gulp.dest('./build/'));
});

gulp.task('css', function(){
	return gulp.src("public/stylesheets/*.css")
		.on('error', interceptErrors)
		.pipe(gulp.dest('./build/'));
});

gulp.task('favicon', function(){
	return gulp.src(favicon)
		.on('error', interceptErrors)
		.pipe(gulp.dest('./build/'));
});

gulp.task('views', function(){
	return gulp.src(viewFiles)
		.pipe(templateCache({
			standalone: true
		}))
		.on('error', interceptErrors)
		.pipe(rename("app.templates.js"))
		.pipe(gulp.dest('./public/javascripts/config/'));
});

gulp.task('errors', function(){
	return gulp.src("public/*.ejs")
		.on('error', interceptErrors)
		.pipe(gulp.dest('./build/'));
});

gulp.task('default', ['lint', 'html', 'css', 'favicon', 'errors', 'browserify']);