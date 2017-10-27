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
            'rxjs': {defaultExtension: 'js', main : "bundles/Rx.js"}
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
                '@angular/material': 'lib/@angular/material/bundles/material.umd.js',

                 //'@angular/cdk': 'lib/@angular/cdk/bundles/cdk.umd.js',
                 // CDK individual packages
                 '@angular/cdk/bidi': 'lib/@angular/cdk/bundles/cdk-bidi.umd.js',
                 '@angular/cdk/coercion': 'lib/@angular/cdk/bundles/cdk-coercion.umd.js',
                 '@angular/cdk/keycodes': 'lib/@angular/cdk/bundles/cdk-keycodes.umd.js',
                 '@angular/cdk/overlay': 'lib/@angular/cdk/bundles/cdk-overlay.umd.js',
                 '@angular/cdk/portal': 'lib/@angular/cdk/bundles/cdk-portal.umd.js',
                 '@angular/cdk/rxjs': 'lib/@angular/cdk/bundles/cdk-rxjs.umd.js',
                 '@angular/cdk/collections': 'lib/@angular/cdk/bundles/cdk-collections.umd.js',
                 '@angular/cdk/observers': 'lib/@angular/cdk/bundles/cdk-observers.umd.js',
                 '@angular/cdk/scrolling': 'lib/@angular/cdk/bundles/cdk-scrolling.umd.js',
                 '@angular/cdk/stepper': 'lib/@angular/cdk/bundles/cdk-stepper.umd.js',
                 '@angular/cdk/table': 'lib/@angular/cdk/bundles/cdk-table.umd.js',
                 '@angular/cdk/platform': 'lib/@angular/cdk/bundles/cdk-platform.umd.js',
                 '@angular/cdk/a11y': 'lib/@angular/cdk/bundles/cdk-a11y.umd.js',

                 // other libraries
                'rxjs':                      'lib/rxjs',
                'tslib':                     'lib/tslib/tslib.js',
                'ts':                        'lib/plugin-typescript/lib/plugin.js',
                'typescript':                'lib/typescript/lib/typescript.js',
                'ngx-bootstrap': 'lib/ngx-bootstrap/bundles/ngx-bootstrap.umd.min.js',
                'angular2-toaster': 'lib/angular2-toaster/bundles/angular2-toaster.umd.js',
              }
        });
        System.import('app/boot')
              .then(null, console.error.bind(console));
})(this);