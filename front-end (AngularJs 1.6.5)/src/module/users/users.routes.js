/**
 * User route configurations
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
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
                controllerAs: "usersController",
                data:{ authRequired: true }
            })
            .state('profile', {
                url: '/profile',
                templateUrl: './module/users/view/users/profile.html',
                controller: "UsersController",
                controllerAs: "usersController"
            });
	}
})();