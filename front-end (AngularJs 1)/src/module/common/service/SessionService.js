/**
 * Session service. Does the browser session management
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
(function(){
	'use strict';
	
	angular.module('common.module')
		.factory('SessionService', SessionService);
	
	SessionService.$inject = ['ENVIRONMENT', '$log', '$q', 'AuthService'];
	
	function SessionService(ENVIRONMENT, $log, $q,  AuthService){
		var sessionService = {};

        /**
         * Validates if the user is logged in
         */
        sessionService.ping = function(){
           var deferred = $q.defer();

           AuthService.get({}, function(response){
                               deferred.resolve(true);
                           },function(error){
                                deferred.reject(false);
                          });

           return deferred.promise;
        };

		return sessionService;
	}	
})();