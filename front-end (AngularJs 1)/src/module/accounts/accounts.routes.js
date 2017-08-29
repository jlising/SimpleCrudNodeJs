/**
 * Account route configurations
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
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
                controllerAs: "accountsController",
                data:{ authRequired: true }
            });
	}
})();