var gulp = require('gulp'), 
    runSequence = require('run-sequence'),
    connect = require('gulp-connect'),
    proxy = require('http-proxy-middleware'),
    del = require('del'), 
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'), 
    minify = require('gulp-minify-css'),
    jshint = require('gulp-jshint');

var assets = require("./assets.json");
var dist = '../dist';

//Clean
gulp.task('clean', function(callback) {
	return del([dist + '/*' ], {force: true}, callback);
});

//Lint js
gulp.task('lint', function() {
    return gulp.src(assets.appJs)
      // This is available for modules like jshint-jsx, which
      // expose the normal jshint function as JSHINT and the
      // jsxhint function as JSXHINT
      .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }));
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
//Copy app js
gulp.task('copy:app-js', function() {
	return gulp.src(assets.appJs)
		.pipe(uglify()).pipe(concat('app.js'))
		.pipe(gulp.dest(dist +'/js'));
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
	                 './module/**/*.css',
	                 '!./bower_components/**', 
	                 '!./node/**', 
	                 '!./node_modules/**', 
	                 '!./lib/**', 
	                 '!.' + dist + '/**'])
	                 .pipe(gulp.dest(dist + '/'))
	                 .pipe(connect.reload());
});

//Watch code changes
gulp.task('watch-asset', function(callback) {
    gulp.watch(['./*.html', './module/**/*.html'], ['copy:html'], callback);
    gulp.watch([assets.vendorJs], ['copy:vendors-js'], callback);
    gulp.watch([assets.appJs], ['copy:app-js'], callback);
    gulp.watch([assets.vendorCss], ['copy:vendor-css'], callback);
    gulp.watch([assets.appCss], ['copy:app-css'], callback);
});

//Run proxy server
gulp.task('local-server', function() {
	var host = "localhost";
	var port = 8282;

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
gulp.task("default",function(){
	return runSequence(['clean'],['lint'],
				['copy:vendors-js',
				 'copy:vendors-css',
				 'copy:vendors-css-maps',
				 'copy:app-js',
				 'copy:app-css',
				 'copy:html',
				 'copy:fonts',
				 'copy:images'],

				 ['local-server'],
				 ['watch-asset']);
});