(function(){
	'use strict';
	
	angular.module('common.module')
		.factory('UsersService', UsersService);
	
	UsersService.$inject = ['ENVIRONMENT', 'ResourceFactory'];
	
	function UsersService(ENVIRONMENT, ResourceFactory){
		var url = ENVIRONMENT.proxyUrl + "/users";
		
		//Custom methods here
		var methods = {
				'get' : {
					method : 'GET',
					//isArray : true
				}
		};
		
		//Return new object. Passed arguments will be catch in .apply()
		return new ResourceFactory(url, {}, methods);
	}	
})();