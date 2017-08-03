//Module specific routings
(function(){
	'use strict';
	
	angular.module('accounts.module')
		.config(routeConfig);
	
	routeConfig.$inject = ['$stateProvider'];
	
	function routeConfig($stateProvider){
			$stateProvider
	        .state('accounts', {
                url: '/accounts',
                templateUrl: './module/accounts/view/accounts/index.html',
                controller: "AccountsController",
                controllerAs: "accountsController"
            });
	}
})();