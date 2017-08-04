(function(){
    'use strict';

    angular.module('common.module')
    		.factory('HttpInterceptor', HttpInterceptor);

    HttpInterceptor.$inject = ['ENVIRONMENT', '$log', '$document', '$q'];

    function HttpInterceptor(ENVIRONMENT, $log, $document, $q){
        var httpInterceptor = {
                  // On request success
                  request: function (config) {
                    $log.info("Request sent ...");

                    angular.element($document[0].getElementById('pageLoaderIcon')).removeClass('display-hide');

                    // Return the config or wrap it in a promise if blank.
                    return config || $q.when(config);
                  },

                  // On request failure
                  requestError: function (rejection) {
                    $log.error("Request error ...");

                    angular.element($document[0].getElementById('pageLoaderIcon')).addClass('display-hide');

                    // Return the promise rejection.
                    return $q.reject(rejection);
                  },

                  // On response success
                  response: function (response) {
                    $log.info("Received response ...");

                    angular.element($document[0].getElementById('pageLoaderIcon')).addClass('display-hide');

                    // Return the response or promise.
                    return response || $q.when(response);
                  },

                  // On response failture
                  responseError: function (rejection) {
                    $log.info("Response error ...");

                    angular.element($document[0].getElementById('pageLoaderIcon')).addClass('display-hide');

                    // Return the promise rejection.
                    return $q.reject(rejection);
                  }
        };

        return httpInterceptor;
    }
})();