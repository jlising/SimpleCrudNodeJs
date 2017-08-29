/**
 * Module specific configurations
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
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
         .config(['$locationProvider', '$logProvider', '$httpProvider', function($locationProvider, $logProvider, $httpProvider) {
                 $httpProvider.interceptors.push('HttpInterceptor');
                 $logProvider.debugEnabled(true);
                 //$locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
         }])
         .run(['$trace', function($trace){
                $trace.enable('TRANSITION');//Enable tracing to show logs
         }])
         .run(['$rootScope', '$transitions', '$localStorage', 'SessionService', function($rootScope, $transitions, $localStorage, SessionService){
             $rootScope.$storage = $localStorage;

             if(!angular.isDefined($rootScope.$storage.session)){
                $rootScope.$storage.session = {};
             }

             $transitions.onStart({
                    to: function(state) {
                            // Proceed only to those routes that need to be authenticated
                            return state.data != null && state.data.authRequired === true;
                        }
                   },
                   function(trans) {
                           if(!$rootScope.$storage.session.isAuthenticated){
                                return trans.router.stateService.target('login');
                           }
                    }
             );
         }]);
})();