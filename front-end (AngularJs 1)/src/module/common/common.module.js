//Initialize module and add specific settings here...
(function(){
	'use strict';
	
	 angular.module("common.module", [])
		 .constant( 'ENVIRONMENT', {
			 proxyUrl : '/api',
			 rowsPerPage : 5
		 })

		 .config(['ngToastProvider', function(ngToastProvider) {
           ngToastProvider.configure({
              animation: 'fade', // or 'fade'
              timeout : 3000
           });
         }])
         .config(['$logProvider', '$httpProvider', function($logProvider, $httpProvider) {
                 $httpProvider.interceptors.push('HttpInterceptor');
                 $logProvider.debugEnabled(true);
         }]);


})();