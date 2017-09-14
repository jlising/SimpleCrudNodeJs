//http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html
const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
//const tslint = require('gulp-tslint');
const tsconfig = require('tsconfig-glob');
const runSequence = require('run-sequence');

const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify-css');


const tscConfig = require('./tsconfig.json');
var assets = require("./assets.json");
const dist = '../dist';

//Clean
gulp.task('clean', function(callback) {
	return del([dist + '/*' ], {force: true}, callback);
});

//Copy dependencies
gulp.task('copy:libs', function() {
  return gulp.src([
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/**/*',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/node-uuid/uuid.js',
    'node_modules/immutable/dist/immutable.js',
    'systemjs.config.js'
    ], {cwd : '**'})
    .pipe(gulp.dest(dist))
});
//Rename node_modules
gulp.task('rename:node_modules', function(done) {
 return fs.rename(dist + '/node_modules', dist +  '/lib', function (err) {
    if (err) {
      throw err;
    }
    done();
  });
});


//Copy third party js
gulp.task('copy:vendors-js', function() {
	return gulp.src(assets.vendorJs)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(dist +'/js'));
});

//Copy third party css
gulp.task('copy:vendors-css', function() {
	return gulp.src(assets.vendorCss).pipe(concat('vendor.css'))
		.pipe(gulp.dest(dist +'/css'));
});

gulp.task('copy:vendors-css-maps', function() {
	return gulp.src(assets.vendorCssMaps)
		.pipe(gulp.dest(dist +'/css'));
});

//Copy app css
gulp.task('copy:app-css', function() {
	return gulp.src(assets.appCss)
		//.pipe(minify())
		.pipe(concat('app.css'))
		.pipe(gulp.dest(dist +'/css'));
});

//Copy fonts
gulp.task('copy:fonts', function() {
	return gulp.src(assets.fonts)
		.pipe(gulp.dest(dist +'/fonts'));
});

//Copy images
gulp.task('copy:images', function() {
	return gulp.src(assets.images)
		.pipe(gulp.dest(dist +'/images'));
});

//Copy html
gulp.task('copy:html', function() {
	return gulp.src(['./**/*.html',
	                 '!./bower_components/**',
	                 '!./node/**',
	                 '!./node_modules/**',
	                 '!./lib/**',
	                 '!.' + dist + '/**'])
	                 .pipe(gulp.dest(dist + '/'))
	                 .pipe(connect.reload());
});

//TSLint
gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

//TS globbing, allows pattern in tsconfig.json. see filesGlob
//Will update the files[] property
gulp.task('tsconfig-glob', function () {
  return tsconfig({
    configPath: '.',
    cwd: process.cwd(),
    indent: 2
  });
});

//TypeScript compile
gulp.task('compile', function () {
  return gulp
    .src(assets.appTs) //.src('app/**/*.ts')
    .pipe(sourcemaps.init())          // <--- sourcemaps
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))      // <--- sourcemaps
    .pipe(gulp.dest(dist +'/app'));
});

//Run proxy server
gulp.task('local-server', function() {
	var host = "localhost";
	var port = 8181;

    var contextPath = "";

    var target = "http://localhost:9090";//This is the server hosting the REST service

    var redirectStatusCode = [301, 302, 307, 308];

	return connect.server({
		root : dist + '/',
		host : host,
		port : port,
		livereload : true,
		livereload : {
			port : 1224
		},
		middleware : function(connect, opt) {
             return [
                 proxy('/api', {
                     target: target,
                     changeOrigin:true,
                     pathRewrite: {
                       '^/api' : contextPath
                     },
                     onProxyRes : function(proxyRes, req, res) {
                        if(proxyRes.headers['set-cookie'] && proxyRes.headers['set-cookie'].length) {
                          proxyRes.headers['set-cookie'][0] = proxyRes.headers['set-cookie'][0].replace(contextPath, "");
                        }
                        delete proxyRes.headers['x-removed'];

                        if(redirectStatusCode.indexOf(proxyRes.statusCode) > -1) {
                          proxyRes.headers['location'] =  proxyRes.headers['location'].replace(target + contextPath, "http://" + host + ":" + port)
                        }
                     }
                 })
             ]
		}
	});
});

//Default task
gulp.task("default", function(){
    return runSequence(['clean'],
                       ['compile',
                       'copy:vendors-js',
                       'copy:vendors-css',
                       'copy:vendors-css-maps',
                       'copy:app-css',
                       'copy:html',
                       'copy:fonts',
                       'copy:images',
                       'copy:libs'],
                       ['rename:node_modules'],
				       ['local-server']);
});