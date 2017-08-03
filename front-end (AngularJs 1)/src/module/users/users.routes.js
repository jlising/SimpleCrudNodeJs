//Module specific routings
(function(){
	'use strict';
	
	angular.module('users.module')
		.config(routeConfig);
	
	routeConfig.$inject = ['$stateProvider'];
	
	function routeConfig($stateProvider){
			$stateProvider
	        .state('users', {
                url: '/users',
                templateUrl: './module/users/view/users/index.html',
                controller: "UsersController",
                controllerAs: "usersController"
            });
	}
})();