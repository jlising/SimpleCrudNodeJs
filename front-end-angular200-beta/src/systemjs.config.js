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
            'node-uuid': {
              map: {
                crypto: '@empty'
              }
            },
            'rxjs': {defaultExtension: 'js'}
          },
          map: {
            immutable: 'lib/immutable/dist/immutable.js',
            'node-uuid': 'lib/uuid.js',
             'rxjs': 'lib/rxjs'
          }
        });
        System.import('app/boot')
              .then(null, console.error.bind(console));
})(this);