/**
 * Accounts service. Extends ResourceFactory for REST requests
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
(function(){
	'use strict';
	
	angular.module('common.module')
		.factory('AccountsService', AccountsService);
	
	AccountsService.$inject = ['ENVIRONMENT', 'ResourceFactory'];
	
	function AccountsService(ENVIRONMENT, ResourceFactory){
		var url = ENVIRONMENT.proxyUrl + "/accounts";
		
		//Custom methods here
		var methods = {
				'get' : {
					        method : 'GET',
					        //isArray : true
				        },
				'getById' : {
				            url : url + "/:id",
				            method : 'GET'
				        },
				 'getByName' : {
                 				            params : {name : '@name'},
                 				            method : 'GET'
                 				        },
				 'update' :{
				            url : url + "/:id",
                 		    method : 'PATCH'
				 },
				 'delete' :{
                            url : url + "/:id",
                            method : 'DELETE'
                 }
		};
		
		//Return new object. Passed arguments will be catch in .apply()
		return new ResourceFactory(url, {}, methods);
	}	
})();