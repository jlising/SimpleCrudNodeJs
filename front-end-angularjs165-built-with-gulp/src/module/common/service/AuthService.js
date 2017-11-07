/**
 * Auth service. Extends ResourceFactory for REST requests
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
(function(){
	'use strict';
	
	angular.module('common.module')
		.factory('AuthService', AuthService);
	
	AuthService.$inject = ['ENVIRONMENT', 'ResourceFactory'];
	
	function AuthService(ENVIRONMENT, ResourceFactory){
		var url = ENVIRONMENT.proxyUrl + "/auth";
		
		//Custom methods here
		var methods = {
				'login' : {
				            url : url + '/login',
					        method : 'POST',
					        //isArray : true
			    },
			    'fbLogin' : {
                            url : url + '/facebook',
                            method : 'GET',
                            //isArray : true
                },
			    'logout' : {
                            url : url + '/logout',
                            method : 'GET',
                            //isArray : true
                },

		};
		
		//Return new object. Passed arguments will be catch in .apply()
		return new ResourceFactory(url, {}, methods);
	}	
})();