/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
   System.config({
          packages: {
            app: {
              format: 'register',
              defaultExtension: 'js'
            },
            'rxjs': {defaultExtension: 'js'}
          },
          map: {
                // our app is within the app folder
                'app': 'app',

                // angular bundles
                '@angular/animations': 'lib/@angular/animations/bundles/animations.umd.js',
                '@angular/animations/browser': 'lib/@angular/animations/bundles/animations-browser.umd.js',
                '@angular/core': 'lib/@angular/core/bundles/core.umd.js',
                '@angular/common': 'lib/@angular/common/bundles/common.umd.js',
                '@angular/common/http': 'lib/@angular/common/bundles/common-http.umd.js',
                '@angular/compiler': 'lib/@angular/compiler/bundles/compiler.umd.js',
                '@angular/platform-browser': 'lib/@angular/platform-browser/bundles/platform-browser.umd.js',
                '@angular/platform-browser/animations': 'lib/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
                '@angular/platform-browser-dynamic': 'lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
                '@angular/http': 'lib/@angular/http/bundles/http.umd.js',
                '@angular/router': 'lib/@angular/router/bundles/router.umd.js',
                '@angular/router/upgrade': 'lib/@angular/router/bundles/router-upgrade.umd.js',
                '@angular/forms': 'lib/@angular/forms/bundles/forms.umd.js',
                '@angular/upgrade': 'lib/@angular/upgrade/bundles/upgrade.umd.js',
                '@angular/upgrade/static': 'lib/@angular/upgrade/bundles/upgrade-static.umd.js',

                // other libraries
                'rxjs':                      'lib/rxjs',
                'tslib':                     'lib/tslib/tslib.js',
                'ts':                        'lib/plugin-typescript/lib/plugin.js',
                'typescript':                'lib/typescript/lib/typescript.js',
                'ngx-bootstrap': 'lib/ngx-bootstrap/bundles/ngx-bootstrap.umd.min.js'

              }
        });
        System.import('app/boot')
              .then(null, console.error.bind(console));
})(this);